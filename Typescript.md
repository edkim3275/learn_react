# TypeScript in React.js

## 타입스크립트를 사용하는 이유

### 1. IDE를 더욱 더 적극적으로 활용(자동완성, 타입확인)

TypeScript를 활용하면 자동완성이 굉장히 잘 됩니다. 함수를 사용할 때 해당 함수가 어떤 파라미터를 필요로 하는지, 그리고 어떤 값을 반환하는지 코드를 따로 까보지 않아도 알 수 있습니다. 리액트 컴포넌트의 경우 해당 컴포넌트를 사용할게 될 때 props에는 무엇을 전달해줘야하는지, JSX를 작성하는 과정에서 바로 알 수 있으며, 컴포넌트 내부에서도 자신의 props에 어떤 값이 있으며, state에 어떤 값이 있는지 알 수 있습니다. 또한 리덕스와 함께 사용하게 될 때에도 스토어 안에 어떤 상태가 들어있는지 바로 조회가 가능해서 굉장히 편리합니다.

### 2. 실수방지

함수, 컴포넌트 등의 타입 추론이 되다보니, 사소한 오타를 만들거나 할 경우 코드를 실행하지 않더라도 IDE 상에서 바로 알 수 있게 됩니다. 그리고, 예를 들어 null이나 undefined 일 수도 있는 값의 내부 값 혹은 함수를 호출한다면 사전에 null 체킹을 하지 않으면 오류를 띄우기에 null 체킹도 확실하게 가능합니다.

## 타입스크립트 연습

### 기본타입

```typescript
let count = 0;
count += 1;
count = 'string'; // Error

const message: string = 'hello world'; // 문자열

const done: boolean = true; // 불리언

const numbers: nubmer[] = [1, 2, 3]; // 숫자배열
const messages: string[] = ['hello', 'world']; // 문자배열

messages.push(1); // 문자배열에 숫자배열은 넣지 못한다.(Error)

let mightBeUndefined: string | undefined = undefined; // string일 수도 있고, undefined일 수도 있음
let nullableNumber: number | null = null; // number일 수도 있고, null일 수도 있음.

let color: 'red' | 'orange' | 'yellow' = 'red'; // red, orange, yellow 중에 하나
color = 'yellow';
color = 'orange';
color = 'green'; // Error
```

TypeScript를 사용하면 특정 변수 또는 상수의 타입을 지정 할 수 있고 우리가 사전에 지정한 타입이 아닌 값이 설정될 때 바로 에러를 발생시킵니다.

이렇게 에러가 났을때는 컴파일이 되지 않습니다.

### 함수에서 타입 정의하기

```typescript
function sum(x: number, y: number): number {
    return x+y;
}
sum(1, 2);
```

TypeScript를 사용하면  코드를 작성하는 과정에서 함수의 파라미터로 어떤 타입을 넣어야 하는지 그리고 어떤 타입을 반환받는지 바로 알 수 있습니다.

```typescript
function sumArray(numbers: number[]): number {
    return numbers.reduce((acc, cur) => acc + cur, 0);
}
const total = sumArray([1, 2, 3]);
```

참고로 함수에서 만약 아무것도 반환하지 않아야 한다면 이의 반환 타입을 `void`로 설정하면 됩니다.

```typescript
function returnNoting(): void {
    console.log('hello');
}
```

### interface 사용해보기

`interface`는 **클래스 또는 객체를 위한 타입을 지정**할 때 사용되는 문법입니다.

- 클래스에서 interface를 implements 하기

```typescript
// Shape이라는 interface를 선언
interface Shape {
    getArea(): number; // Shape interface에는 getArea라는 함수가 반드시 있어야 하며 해당 함수의 반환값은 숫자
}

// implements 키워드를 사용하여 해당 클래스가 Shape interface의 조건을 충족하겠다는 것을 명시
class Circle implements Shape {
    radius: number; // 멤버변수 radius 값을 설정
    
    constructor(radius: number) {
        this.radius = radius
    }
    
    // 너비를 가져오는 함수 구현
    getArea() {
        return this.radius * this.radius * Math.PI;
    }
}

class Rectangle implements Shape {
    width: number;
    height: number;
    
    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
    getArea() {
        return this.width * this.height;
    }
}

const shapes: Shape[] = [new Circle(4), new Rectangle(2, 5)];

shapes.forEach(shape => {
    console.log(shape.getArea())
})
```

기존에 작성한 코드를 보면

```typescript
width: number;
height: number;

constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
}
```

width, height 멤버 변수를 선언한 다음 constructor에서 해당 값들을 하나 하나 설정을 했지만, TypeScript에서는 constructor의 파라미터 쪽에 `public` 또는 `private` 접근자를 사용하면 직접 하나하나 설정해주는 작업을 생략해줄 수 있습니다.

```typescript
...
class Rectangle implements Shape {
  constructor(private width: number, private height: number) {
    this.width = width;
    this.height = height;
  }
  getArea() {
    return this.width * this.height;
  }
}
...
```

`public`으로 선언된 값은 클래스 외부에서 조회 할 수 있으며 `private`으로 선언된 값은 클래스 내부에서만 조회 할 수 있습니다. 따라서 rectangle의 width 또는 height 값은 클래스 외부에서 조회할 수 없습니다.

- 일반 객체를 interface로 타입 설정하기

```typescript
interface Person {
    name: string;
    age?: number; // 물을표가 들어갔다는 것은, 설정을 해도 되고 안해도 되는 값이라는 것을 의미.
}

interface Developer {
    name: string;
    age?: number;
    skills: string[];
}

const person: Person = {
    name: 'edgar',
    age: 20
};

const expert: Developer {
    name: 'devkim',
 	skills: ['js', 'react']
}
```

현재 Person과 Developer의 형태가 유사한데, 이럴 때 interface를 선언할 때 다른 interface를 `extends` 키워드를 사용해서 상속받을 수 있습니다.

```typescript
interface Developer extends Person {
    skills: string[];
}
...
const people: Person[] = [person, expert];
```

### Type Alias 사용하기

`type`은 **특정 타입에 별칭을 붙이는 용도**로 사용합니다. 이를 사용하여 객체를 위한 타입을 설정할 수도 있고, 배열, 또는 그 어떤 타입이던 별칭을 지어줄 수 있습니다.

```typescript
type Person = {
    name: string;
    age?: number;
}

// &는 Intersection 으로서 두개 이상의 타입들을 합쳐줍니다.
type Developer = Person & {
    skills: string[];
}

const person: Person = {
    name: 'edgar',
}

const expert: Developer = {
    name: 'devkim',
    skills: ['js', 'react']
}

type People = Person[];
const people: People = [person, expert];

type Color = 'red' | 'orange' | 'yellow';
const color: Color = 'red';
const colors: Color[] = ['red', 'orange']
```

`type`과 `interface`를 배웠는데, 어떤 용도로 사용을 할까요? 클래스와 관련된 타입의 경우엔 interface를 사용하는게 좋고, 일반 객체의 타입의 경우엔 그냥 type을 사용해도 무방합니다. 사실 객체를 위한 타입을 정의할 때 무엇이든 써도 상관없는데 일관성 있게만 쓰시면 됩니다.

### Generics

제너릭(Generics)은 타입스크립트에서 함수, 클래스, interface, type alias를 사용하게 될 때 **여러 종류의 타입에 대하여 호환을 맞춰야 하는 상황**에서 사용하는 문법

- 함수에서 Generics 사용하기

예를 들어 객체A와 객체B를 합쳐주는 merge 함수를 만든다고 가정해봅시다. 그런 상황에서는 A와 B가 어떤 타입이 올 지 모르기 때문에 이런 상황에서는 `any`라는 타입을 쓸 수 있습니다.

```typescript
function merge(a: any, b: any): any {
    return {
        ...a,
        ...b
    };
}
const merged = merge({foo: 1}, {boo: 1});
```

하지만, 이렇게 하면 타입 유추가 모두 깨진거나 다름 없습니다. 결과가 any라는 것은 즉 merged 안에 무엇이 있는지 알 수 없다는 것이기 때문입니다. 이런 상황에 Generics를 사용하면 됩니다.

```typescript
function merge<A, B>(a: A, b: B): A & B {
    return {
        ...a,
        ...b
    };
}

const merged = merge({foo: 1}, {boo: 1});
```

또 다른 예시를 살펴보면

```typescript
function wrap<T>(param: T) {
    return {
        param
    }
}
const wrapped = wrap(10)
```

이처럼 함수에서 Generics를 사용하면 파라미터로 다양한 타입을 넣을 수 있고, 타입 지원을 지켜낼 수 있습니다.

- interface에서 Generics 사용하기

```typescript
interface Items<T> {
    list: T[];
}

const itmes: Items<string> = {
    list: ['a', 'b', 'c']
}
```

- type에서 Generics 사용하기

```typescript
type Items<T> = {
	list: T[];
}

const items: Items<string> {
    list: ['a', 'b', 'c']
}
```

- 클래스에서 Generics 사용하기

```typescript
class Queue<T> {
    list: T[] = [];
    get length() {
        return this.list.length;
    }
    enqueue(item: T) {
        this.list.push(item);
    }
    dequeue() {
        return this.list.shift();
    }
}

const queue = new Queue<number>();
queue.enqueue(0);
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
console.log(queue.dequeue());
```

## 리액트 컴포넌트 타입스크립트로 작성하기

### 프로젝트 생성

타입스크립트를 사용하는 리액트 프로젝트 생성

```bash
$ npx create-react-app ts-react-tutorial --template typescript
```

`--typescript`가 있으면 타입스크립트 설정이 적용된 프로젝트가 생성됩니다. 

만약, 이미 만든 프로젝트에 타입스크립트를 적용하고 싶다면 이 [링크](https://create-react-app.dev/docs/adding-typescript/)를 확인해주세요.

- App.tsx

```typescript
import React from 'react';

const App: React.FC = () => {
    return (
    	<div>hello</div>
    )
}

export default App;
```

컴포넌트를 선언하는 방식은 `function` 키워드를 사용하거나 위처럼 화살표 함수를 사용하는 방식이 존재합니다. 다만 위 코드에서는 `React.FC`라는 것을 사용하여 컴포넌트의 타입을 지정했는데, 이렇게 타입을 지정하는것이 좋을수도 있고, 나쁠수도 있습니다.

한번 새로운 컴포넌트를 선언하면서 `React.FC`를 사용하고 사용하지 않는것이 어떤 차이가 있는지 알아보겠습니다.

### 새로운 컴포넌트 만들기

```typescript
import React from 'react';

type GreetingsProps = {
    name: string;
}

const Greetings: React.FC<GreetingsProps> = ({ name }) => (
	<div>Hello, {name}</div>
)

export default Greetings;
```

`React.FC`를 사용 할 때는 props의 타입을 Generics로 넣어서 사용합니다. 이렇게 `React.FC`를 사용해서 얻을 수 있는 이점은 두가지가 존재합니다.

1. props에 기본적으로 `children`이 들어가있다는 것 입니다.
2. 컴포넌트의 defaultProps, propTypes, contextTypes를 설정 할 때 자동완성이 될 수 있다는 것 입니다.

한편으로는 단점도 존재하긴 합니다. `children`이 옵셔널 형태로 들어가있다 보니까 어찌 보면 컴포넌트의 props 타입이 명백하지 않습니다. 예를들어 어떤 컴포넌트는 `children`이 무조건 있어야 하는 경우도 있을 것이고, 어떤 컴포넌트는 `children`이 들어가면 안되는 경우도 있을 것입니다. `React.FC`를 사용하면 기본적으로는 이에 대한 처리를 제대로 못하게 됩니다. 만약에 하고 싶다면 결국 Props 타입 안에 `children`을 설정해야합니다.

예를  들자면 다음과 같습니다.

```typescript
type GreetingsProps = {
    name: string;
    children: React.ReactNode;
}
```

또한, `React.FC`는 (확인이 필요) `defaultProps`가 제대로 작동하지 않습니다. 예를 들어서 코드를 다음과 같이 작성했다고 가정해봅시다.

```typescript
...
type GreetingsProps = {
    name: string;
   	mark: string;
}

const Greetings: React.FC<GreetingsProps> = ({name, mark}) => ( ... )
                                                           
                                                           
Greetings.defaultProps = {
    mark: '!'
};
```

그리고 App에서 해당 컴포넌트를 렌더링하면 `mark`를 `defaultProps`로 넣었음에도 불구하고 `mark`값이 없다면서 제대로 작동하지 않습니다. 반면, `React.FC`를 생략하면 어떨까요?

```typescript
...
const Greetings = ({ name, mark }: GreetingsProps) => (...)
...
```

아주 잘 됩니다! 이러한 이슈 때문에 `React.FC`를 쓰지 말라는 게시글도 존재합니다. 취향에 따라 화살표 함수도 사용하지 않는다면 아래와 같은 형태가 됩니다.

```typescript
...
function Greetings ({ name, mark }: GreetingsProps) {
    ...
}
```

컴포넌트에 만약 있어도 되고 없어도 되는 `props`가 있다면 `?` 문자를 사용하면 됩니다.

```typescript
type GreetingsProps = {
    name: string;
    mark: string;
    optional?: string;
}
function Greetings ({name, mark, optional }: GreetingsProps) {
    ...
}
```

만약 이 컴포넌트에서 특정 함수를 `props`로 받아와야 한다면 다음과 같이 타입을 지정할 수 있습니다.

```typescript
type GreetingsPrps = {
    name: string;
    mark: string;
    optional?: string;
    onClick: (name: string) => void;
}
function Greetings({name, mark, optional, onClick}: GreetingsProps) {
    return (
    	{optional && <p>{optional}</p>}
    )
}
```







## 참고링크

벨로퍼트 블로그 : https://react.vlpt.us/using-typescript/

공식문서 : https://typescript-kr.github.io/pages/jsx.html



