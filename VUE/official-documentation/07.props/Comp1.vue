<template>
    Hi,{{ bar }}
</template>

<script  >
export default {
    props: ['bar'],
    setup(props) {
        console.log(props.bar)
        return {
            foo: props.bar
        }
    }
}
</script>