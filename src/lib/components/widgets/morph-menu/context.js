import { getContext, setContext } from "svelte"

const CONTEXT_KEY = "rift::ui::context::morph-menu"

export function getMorphMenuContext(){
    return getContext(CONTEXT_KEY)
}

export function setMorphMenuContext(context){
    return setContext(CONTEXT_KEY, context)
}
