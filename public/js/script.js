(function () {
    console.log("imageboard page working");

    Vue.filter("formDate", function (value) {
        return new Date(value).toLocaleString();
    });

    Vue.component("modal", {
        props: ["imageId"],
        template: "#modal",
        data: function () {
            return {
                visible: false,
                image: {},
                prevButtonVisible: true,
                nextButtonVisible: true,
            };
        },
        mounted: function () {
            this.visble = true;
            this.getInfo(this.imageId);
        },
        methods: {
            close: function () {
                this.$emit("close");
            },
            getInfo: function (_id) {
                axios.get(`/images/${_id}`).then((response) => {
                    (this.visible = true), (this.prevButtonVisible = true);
                    this.nextButtonVisible = true;
                    this.image = response.data;
                    if (this.image.prev === null) {
                        this.prevButtonVisible = false;
                    } else if (this.image.next === null) {
                        this.nextButtonVisible = false;
                    }
                });
            },
            previous: function () {
                this.getInfo(this.image.prev);
            },
            next: function () {
                this.getInfo(this.image.next);
            },
            deleteImage: function () {
                if (confirm("Do you really want to delete the image?")) {
                    axios.delete(`/images/${this.image.id}`).then((results) => {
                        this.$emit("erase");
                    });
                }
            },
        },
        watch: {
            imageId: function () {
                this.getInfo(this.imageId);
            },
        },
    });

    Vue.component("comments", {
        props: ["imageId"],
        template: "#comments",
        data: function () {
            return {
                comments: [],
                username: "",
                text: "",
            };
        },
        mounted: function () {
            axios.get(`/images/${this.imageId}/comments`).then((response) => {
                this.comments = response.data;
            });
        },
        methods: {
            onSubmit: function () {
                axios
                    .post(`/images/${this.imageId}/comments`, {
                        username: this.username,
                        text: this.text,
                        image_id: this.imageId,
                    })
                    .then((response) => {
                        this.comments.push(response.data);
                        this.username = "";
                        this.text = "";
                    });
            },
        },
        watch: {
            imageId: function () {
                axios
                    .get(`/images/${this.imageId}/comments`)
                    .then((response) => {
                        this.comments = response.data;
                    });
            },
        },
    });

    function getIdFromHash() {
        return parseInt(window.location.hash.slice(1));
    }

    new Vue({
        el: "#main",
        data: {
            images: [],
            title: "",
            description: "",
            username: "",
            file: null,
            currentImageID: null,
            lastImageID: null,
            IMG_LIMIT: 4,
            noMoreImages: false,
        },
        mounted: function () {
            this.currentImageID = getIdFromHash();
            axios.get("/images").then((response) => {
                this.images = response.data;
                this.lastImageID = response.data[response.data.length - 1].id;
                if (this.lastImageID === 1) {
                    this.noMoreImages = true;
                }
            });
            window.addEventListener("hashchange", () => {
                this.currentImageID = getIdFromHash();
            });
        },
        methods: {
            onSubmit: function (e) {
                let formData = new FormData();
                formData.append("title", this.title);
                formData.append("description", this.description);
                formData.append("username", this.username);
                formData.append("file", this.file);
                axios
                    .post("/images", formData, {
                        header: {
                            "Content-Type": "multipart/form-data",
                        },
                    })
                    .then((response) => {
                        this.title = "";
                        this.description = "";
                        this.username = "";
                        this.file = null;
                        this.images.push(response.data);
                    });
            },
            onFileSelect: function () {
                this.file = this.$refs.image.files[0];
            },
            onClick: function (id) {
                this.currentImageID = id;
            },
            onClose: function () {
                window.location.hash = "";
                this.currentImageID = null;
            },
            imagedelete: function () {
                window.location.hash = "";
                this.currentImageID = null;
                window.location.reload();
            },
            onMoreButtonClick: function () {
                this.getMoreImages();
            },
            getMoreImages: function () {
                axios
                    .get("/images", {
                        params: {
                            last_id: this.lastImageID || null,
                            limit: this.IMG_LIMIT,
                        },
                    })
                    .then((response) => {
                        this.images = [...this.images, ...response.data];
                        this.lastImageID =
                            response.data[response.data.length - 1].id;
                        if (
                            response.data.length !== this.IMG_LIMIT ||
                            this.lastImageID === 1
                        ) {
                            this.noMoreImages = true;
                        }
                    });
            },
        },
    });
})();
