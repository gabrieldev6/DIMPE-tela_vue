<script setup lang="ts">
import {ref, watch} from 'vue' 

let click = ref<boolean>(false)
let knob = ref<HTMLDivElement>()
let bgKnob = ref<HTMLDivElement>()

const emit = defineEmits(['update:click'])

watch(click, () => {
    console.log(click.value)

    if (click.value == false && knob.value && bgKnob.value) {

        knob.value.style.animation = 'transitionKnobFinish 0.2s forwards'
        bgKnob.value.style.animation = 'transitionColorFinish 0.2s forwards'

    } else if (knob.value && bgKnob.value) {

        knob.value.style.animation = 'transitionKnobInit 0.2s forwards'
        bgKnob.value.style.animation = 'transitionColorInit 0.2s forwards'
    }
})

</script>
<template>
    <div ref="bgKnob" class="bg-gray w-50px h-25px rounded-xl flex items-center">
        <div ref="knob" @click="click = !click"
            class="bg-white flex rounded-full w-20px h-20px m-2px"></div>
    </div>
</template>



<style>
@keyframes transitionColorInit {
    from {
        background-color:#9ca3af;
        
    } to {
        
        background-color: #3b82f6;
    }
}
@keyframes transitionColorFinish {
    from {
        
        background-color:#3b82f6;
    } to {
        
        background-color: #9ca3af;
    }
}

@keyframes transitionKnobInit {
    from {
        
        translate: 0px 0px;
    } to {
        translate: 25px 0px;
        
    }
}
@keyframes transitionKnobFinish {
    from {
        translate: 25px 0px;
        
    } to {
        translate: 0px 0px;
        
    }
}
</style>