import {createStore} from './redux';
import $ from 'jquery';

const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

$(document.body).append('<p id="counter"></p><button id="increaseBtn">+</button><button id="decreaseBtn">-</button>');

//state是状态树，可以是任意结构
//action 是一个纯对象{type:'INCREASE', amount:1},必须有一个type属性，其他属性根据业务需求而定
let reducer = (state = {number: 0}, action) => {

    if (action === undefined) {//初始化时使用
        return state;
    }

    switch (action.type) {

        case INCREASE:
            return {number: state.number + action.amount};

        case DECREASE:
            return {number: state.number - action.amount};

        default:
            return state;
    }
}

let store = createStore(reducer);

let render = () => {
    $('#counter').html(store.getState().number);
}

store.subscribe(render);//当仓库里的state发生变化时，会重新执行render方法，读取最新的状态，并重新渲染视图

$('#increaseBtn').click(() => store.dispatch({type: INCREASE, amount: 3}));
$('#decreaseBtn').click(() => store.dispatch({type: DECREASE, amount: 2}));

render();