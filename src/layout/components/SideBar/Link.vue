
<template>
    <!-- 区分外链和内链 -->
    <!-- eslint-disable vue/require-component-is -->
    <component v-bind="linkProps(to)">
        <slot />
    </component>
</template>

<script>
// import { isExternal } from "@/utils/validate";

export default {
    props: {
        to: {
            type: String,
            required: true
        }
    },
    methods: {
        linkProps(url) {
            // if (isExternal(url)) {
            //     return {
            //         is: "a",
            //         href: url,
            //         target: "_blank",
            //         rel: "noopener"
            //     };
            // }
            return {
                is: "router-link",
                to: url
            };
        }
    }
};
</script>
