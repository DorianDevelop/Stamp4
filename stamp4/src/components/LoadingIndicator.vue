<template>
    <div v-if="isLoading" class="loading-overlay">
        <div class="spinner"></div>
    </div>
</template>

<script>
export default {
    props: {
        duration: {
            type: Number,
            default: 5000, // Default duration of 5 seconds
        },
    },
    data() {
        return {
            isLoading: false,
        };
    },
    methods: {
        startLoading() {
            this.isLoading = true;
            setTimeout(() => {
                this.isLoading = false;
            }, this.duration);
        },
    },
};
</script>

<style>
.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.spinner {
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top: 4px solid white;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
