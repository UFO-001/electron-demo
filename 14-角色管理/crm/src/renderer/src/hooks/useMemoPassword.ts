import { ref } from 'vue'

function useMemoPassword(){
    let memoValue = ref(localStorage.getItem('memoPassword') == 'true' ? true : false)

    const onMemoPassword = (value:any) => {
        localStorage.setItem('memoPassword',memoValue.value = value)
    }

    return {
        memoValue,
        onMemoPassword
    }
}

export default useMemoPassword