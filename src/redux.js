//创建仓库,会导出一个createStore()函数
export const createStore = (reducer) => {

    let state;//状态
    let listeners = [];

    //用来获取最新的状态
    let getState = () => state;

    //向仓库发送action
    let dispatch = (action) => {

        state = reducer(state, action);//reducer会返回新的state,完成了state的修改

        //状态更新后，需要通知所有的订阅者
        listeners.forEach(listener => listener());//执行所有的订阅函数

    }

    //订阅仓库内的状态变化事件，当状态发生变化后会调用对应的监听函数
    //订阅方法执行后会返回一个取消订阅的函数，调用它可以取消订阅
    let subscribe = (listener) => {

        listeners.push(listener);//向订阅数组添加监听函数
        return () => {
            listeners = listeners.filter(l => listener != l);
        }

    }

    dispatch();

    return {
        getState,//获取最新状态对象
        subscribe,//订阅状态变化事件
        dispatch//发送action
    }
}