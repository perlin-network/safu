<template>
    <article class="pa3 pa5-ns">
        <h1 class="f3 f1-m f-headline-l">Title</h1>
        <p class="measure lh-copy">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
            tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
            vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
            no sea takimata sanctus est Lorem ipsum dolor sit amet.
        </p>
        <p class="measure lh-copy">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
            tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
            vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
            no sea takimata sanctus est Lorem ipsum dolor sit amet.
        </p>
    </article>
</template>

<script>
    import "tachyons/css/tachyons.css";

    export default {
        name: 'home',
        data() {
            return {
                someText: "bla",
            }
        }
    }
</script>

<style>
    .lh-copy {
        line-height: 1.5;
    }

    .pa3 {
        padding: 1rem;
    }

    .f3 {
        font-size: 1.5rem;
    }

    .measure {
        max-width: 30em;
    }

    @media screen and (min-width: 30em) {
        .pa5-ns {
            padding: 4rem;
        }
    }

    @media screen and (min-width: 30em) and (max-width: 60em) {
        .f1-m {
            font-size: 3rem;
        }
    }

    @media screen and (min-width: 60em) {
        .f-headline-l {
            font-size: 6rem;
        }
    }
</style>
