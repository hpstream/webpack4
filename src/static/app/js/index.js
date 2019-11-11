
/* eslint-disable */
new Vue({
    el: '#app',
    components: {
    },
    data: {},
    mounted() {

    },
    methods: {
        getTagOwnerInfo() {
            console.log('hhh');
            import('../vue/components/silder-like.vue').then(res => {
                console.log('------------------------------------');
                console.log(res);
                console.log('------------------------------------');
            });
            import('../vue/components/silder-like-item.vue').then(res => {
                console.log('------------------------------------');
                console.log(res);
                console.log('------------------------------------');
            });
        }
    }
});
