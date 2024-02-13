## React与TypeScript

### 基于Vite插件开发环境

Vite是一个`框架无关的前端工具链`，可以快速的生成一个 React + TS 的开发环境，并且可以提供快速的开发体验。

搭建环境：

```bash
npm create vite@latest react-ts-pro -- --template react-ts
```

说明：

1. npm create vite@latest 固定写法 （使用最新版本vite初始化项目)。
2. react-ts-pro 项目名称 （可以自定义）。
3. -- --template react-ts 指定项目模板为react-ts。







### useState与TypeScript

#### 1、自动推导

通常React会根据传入`useState的默认值`来自动推导类型,不需要显式标注类型。

```js
const [value,toggle] = useState(false)
```

说明：

1. value：类型为boolean
2. toggle：参数类型为boolean





#### 2、传递泛型参数

useState本身是一个`泛型函数`，可以传入具体的自定义类型。

```tsx
type User = {
    name:string,
    age:number
}

const [user,setUser] = useState<User>()
```

说明：

1. 限制useState函数参数的初始值必须满足类型为 ： User | ()=> User。
2. 限制setUser函数的参数必须满足类型为：User | ()=> User | undefined。
3. user状态数据具备User类型相关的类型提示。

 



#### 初始值为null

当我们不知道状态的初始值是什么，将useState的`初始值为null`是一个常见的做法，可以通过`具体类型联合null`来做显式注解。

```tsx
type User = {
    name:string
    age:number
}

const [user,setUser] = useState<User | null>(null)
```

说明： 

1. 限制useState函数参数的初始值可以是 User | null 。

2. 限制setUser函数的参数类型可以是 User | null。







### Props与TypeScript

#### 1、基础使用

为组件props添加类型，本质是给`函数的参数做类型注解`，可以使用`type对象类型或者interface接口`来做注解。

```tsx
type Props = {
    className:string
}

function Button(props:Props){
    const { className } = props
    return <button className={className}>click me</button>
}
```

说明：Button组件只能传入名称为className的prop参数，且类型为string，必填。





#### 2、为Props的children属性添加类型

children是一个比较特殊的prop, 支持多种不同类型数据的传入，需要通过一个`内置的ReactNode类型`来做注解。

```tsx
type Props = {
    className:string
    children:React.ReactNode
}

function Button(props:Props){
    const { className,children } = props
    return <button className={className}>{children}</button>
}
```

说明：注解之后，children可以是多种类型，包括：React.ReactElement 、string、number、 React.ReactFragment 、React.ReactPortal 、boolean、 null 、undefined等。





#### 3、为事件prop添加类型

组件经常执行类型为函数的prop实现子传父，这类prop重点在于函数参数类型的注解。

```tsx
type Props = {
	onGetMsg?:(msg:string) => void
}

function Son(props:Props) {
    const { onGetMsg } = props
    const clickHandler = ()=>{
        onGetMsg?.('this is msg')
    }
    
    return <button onClick={ clickHandler} >sendMsg</button>
}

function App (){
	const getMsgHandler = (msg:string) =>{
        console.log(msg)
    }
    
    return (
    	<>
              {/* 内联绑定 */}
              <Son onGetMsg={(msg) => console.log(msg)} />
              {/* 单独抽离注解匹配 */}
              <Son onGetMsg={getMsgHandler} />
        </>
    )
}
```

说明： 

1. 在组件内部调用时需要遵守类型的约束，参数传递需要满足要求 。
2. 绑定prop时如果绑定内联函数直接可以推断出参数类型，否则需要单独注解匹配的参数类型。







### useRef与TypeScript

#### 1、获取dom

获取dom的场景，可以直接把要获取的`dom元素的类型当成泛型参数传递给useRef`,可以推导出`.current属性的类型`。

```tsx
function App(){
    const domRef = useRef<HTMLInputElement>(null)
    
    useEffect(()=>{
        domRef.current?.focus()
    },[])
    
    return (
		<>
        	<input ref={domRef} />
        </>
    )
}
```





#### 2、引用稳定的存储器

把useRef当成引用稳定的存储器使用的场景可以通过`泛型传入联合类型`来做，比如定时器的场景：

```tsx
function App(){
    const timerRef = useRef<number | undefined>(undefined)
    
    useEffect(()=>{
        timerRef.current = setInterval(()=>{
            console.log('1')
        },1000)
        
        return ()=>clearInterval(timerRef.current)
    },[])
    
    return <div> this is div <div/>
}
```







### 事件与TypeScript

#### 1、为事件回调添加类型

```tsx
function App(){
	const changeHandler:React.ChangeEventHandler<HTMLInputElement> = (e)=>{
        console.log(e.target.value)
    }
    
    const clickHandler:React.MouseEventHandler<HTMLButtonElement> = (e)=>{
        console.log(e.target)
    }
    
    return (
    	<>
        	<input type="text" onChange={changeHandler} />
        	<button onClick={clickHandler}>click me!</button>
        </>
	)
}
```

说明：通过泛型函数约束了`整个事件回调函数的类型`，主要是为了约束事件参数e的类型。

  





### 极客网Mobile案例

#### 1、环境搭建

























