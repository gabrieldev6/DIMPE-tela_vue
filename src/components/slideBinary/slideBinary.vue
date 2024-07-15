<script setup lang="ts">
import {ref, watch} from 'vue' 

// let click = ref<boolean>(false)
let knob = ref<HTMLDivElement>()
let bgKnob = ref<HTMLDivElement>()

const props = defineProps(['parentState']);
const emit = defineEmits(['stateChanged'])
const model = defineModel()

let click = ref(model)
 
watch(() => click.value, (newValue) => {
    
    click.value = newValue
    if (click.value == false && knob.value && bgKnob.value) {

        knob.value.style.animation = 'transitionKnobFinish 0.2s forwards'
        bgKnob.value.style.animation = 'transitionColorFinish 0.2s forwards'

    } else if (knob.value && bgKnob.value) {

        knob.value.style.animation = 'transitionKnobInit 0.2s forwards'
        bgKnob.value.style.animation = 'transitionColorInit 0.2s forwards'
    }
})

watch(() => props.parentState, (newValue) => {
    
    click.value = newValue
    console.log(click.value)
    if (click.value == false && knob.value && bgKnob.value) {

        knob.value.style.animation = 'transitionKnobFinish 0.2s forwards'
        bgKnob.value.style.animation = 'transitionColorFinish 0.2s forwards'

    } else if (knob.value && bgKnob.value) {

        knob.value.style.animation = 'transitionKnobInit 0.2s forwards'
        bgKnob.value.style.animation = 'transitionColorInit 0.2s forwards'
    }
})


const toggleState = () => {
    click.value = !click.value
    emit('stateChanged', click.value)
}

</script>
<template>
    <div ref="bgKnob" class="bg-gray dark:shadow-black w-50px h-25px rounded-xl flex items-center">
        <div ref="knob" @click="toggleState"
            class="bg-white  shadow-md flex rounded-full w-20px h-20px m-2px"></div>
    </div>
</template>



<style>
@keyframes transitionColorInit {
    from {
        background-color:rgb(156 163 175);
        
    } to {
        
        background-color: #3b82f6;
    }
}
@keyframes transitionColorFinish {
    from {
        
        background-color:#3b82f6;
    } to {
        
        background-color:rgb(156 163 175);
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