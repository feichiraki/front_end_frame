## React—组件进阶

#### 1、组件通讯介绍

`组件`是独立且封闭的单元，默认情况下，只能使用组件自己的数据。在组件化过程中，我们将一个完整的功能 拆分成多个组件，以更好的完成整个应用的功能。而在这个过程中，多个组件之间不可避免的要共享某些数据 。为了实现这些功能，就需要打破组件的独立封闭性，让其与外界沟通。这个过程就是`组件通讯`。

<img src="day02.assets/image-20230920232514301.png" alt="image-20230920232514301" style="zoom:67%;" />







#### 2、组件的props

##### 2.1 介绍

组件是封闭的，要接收外部数据应该通过`props`来实现。

**props的作用**：接收传递给组件的数据。

**传递数据**：给组件标签添加属性。

**接收数据**：函数组件通过`参数props`接收数据，类组件通过`this.props`接收数据。



代码示例：

 传递数据=>

```jsx
<Hello name="jack" age={19} />
```

① 函数组件props接收数据

```jsx
function Hello(props){
    console.log(props)
    return (
    	<div>接收到数据:{props.name}</div>
    )
}
```

②类组件props接收数据

```jsx
class Hello extends React.Component{
 	render(){
        return (
        	<div>接收到的数据：{this.props.age} </div>
        )
    }   
}
```





##### 2.2 props特点

**1.**可以给组件传递任意类型的数据 。

**2.**props 是只读的对象，只能读取属性的值，无法修改对象 。

**3.**注意：使用类组件时，如果写了构造函数，应该将 props 传递给 super()，否则，无法在构造函数中获取到 props！

```jsx
class Hello extends React.Component {
    constructor(props) {
        // 推荐将props传递给父类构造函数
        super(props)
    }
    render() {
        return <div>接收到的数据：{this.props.age}</div>
    }
}
```





#### 3、组件通讯的三种方式





#### 4、Context





##### 5、props深入





#### 6、组件的生命周期





#### 7、render-props和高阶组件

