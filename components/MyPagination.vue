<template>
    <section class="pagination">
        <button class="pagination-btns pagination-arrows arrow-blocked"><</button>
        <button class="pagination-btns selected-pagination" @click="changePage">1</button>
        <button class="pagination-btns" @click="changePage">2</button>
        <button class="pagination-btns" @click="changePage">3</button>
        <button class="pagination-btns pagination-arrows">></button>
    </section>
</template>

<script>
    export default{
        name: 'MyPagination',
        props:{
            value: {
                type: Number,
                required: true,
            },
            limit: Number
        },
        methods:{
            changePage(event){
                // this.toggleSelectedClass(event);
                this.$emit("input", (event.target.innerText - 1) * this.limit);
            },
            // toggleSelectedClass(event){
            //     event.target.classList.add('selected-pagination');
            // }
        }
    }
</script>

<style>
    .pagination{
        display: flex;
        justify-content: center;
    }

    .pagination-btns{
        background-color: #fff;
        border: none;
        border-radius: 3px;
        box-shadow: 0 4px 4px #00000040;
        padding: 7px 12px;
        font-size: 14px;
        margin: 0 5px;
        cursor: pointer;
        color: #333;
    }

    .pagination-arrows{
        color: #A9A7A9;
        font-size: 16px;
    }

    .arrow-blocked{
        color: #a9a7a983;
    }

    .selected-pagination{
        background-color: #007DF0;
        color: #fff;
    }

    @media screen and (max-width: 250px){
        .pagination{
            flex-wrap: wrap;
        }

        .pagination-btns{
            font-size: 12px;
            margin: 5px;
        }
    }
</style>