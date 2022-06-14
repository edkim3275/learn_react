# React

## Why React?

어떤 것을 배운다는 것은 투자한다는 것. 따라서 배움에 투자하는 시간 대비 얼마나 큰 효과와 결과를 만들어내냐가 중요하다.

1. **react를 사용하는 많은 회사**

   신기술을 배울때 중요한 것은 누가 이 기술을 사용하는지, 그들의 규모가 얼마나 큰지 꼭 살펴봐야 한다.

   ![image-20220608220937053](C:\Users\edgar\AppData\Roaming\Typora\typora-user-images\image-20220608220937053.png)

   상위 1m 사이트들 중 react가 차지하는 양(출처: [buildwith](https://trends.builtwith.com/javascript/React))

   또한 그것을 사용하는 회사에게 그것이 얼마나 중요한지 생각해 보아야 한다. 에어비앤비, 인스타그램, 넷플릭스.. 이들에게 React.js는 얼마나 중요한가. 즉 이들 회사에게 웹사이트의 중요성은 어느정인가? very important

2. **react는 어디서 왔는가?**

   페이스북이 만들었고, 오늘날에도 React.js로 작업하고 개발진들을 지속적으로 채용하면서 더 발전시키고있다. 이들이 React.js를 금방 폐기할 순 없을 것

3.  **커뮤니티**

   React를 사용하는 것은 JavaScript를 사용하는 것과 매우 유사하기 때문에 많은 JavaScript 사용자들이 React를 사용한다. 자연스럽게 규모가 커지게 됨.

   커뮤니티가 거대하다는 것은 library, guide, package, teacher, 직업, 채용 등의 규모또한 거대하다는 것.

   ![image-20220608221855514](C:\Users\edgar\AppData\Roaming\Typora\typora-user-images\image-20220608221855514.png)

   주간 설치횟수가 천만이 넘어가는 react(출처 : [npmjs](https://www.npmjs.com/package/react))

## Requirement

HTML, CSS, JS 이해도 필요.

**설치**

1. HTML에서 바로 사용하기

   React를 설치하기 위해서는 두 개의 JavaScript 코드를 import해야한다. `react`와 `react-dom`이다.

   ```html
   <!DOCTYPE html>
   <html>
       <body></body>
       <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
       <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
   </html>
   ```

   

## Basic of React

React는 UI를 interactive하게 해준다. 웹사이트에 interactivity(상호작용)을 만들어주는 것.

React.js Element 생성하기(어려운 방법)

```html
<!DOCTYPE html>
<html>
    <body>
    	<div id="root"></div>
    </body>
    <script src="https://unpkg.com/react@17/umd/react.d..."></script>
    <script src="https://unpkg.com/react-dom@..."></script>
    <script>
        const root = document.getElementById("root");
    	const span = React.createElement("span");
        ReactDom.render(span, root);
    </script>
</html>
```

reactjs : interactive한 react element 생성

reactDOM : react element를 HTML로 변경

- JSX

  `createElement`는 개발자들이 interactive한 요소를 보다 간편하게 만들기위해서 생겨났는데 이를 react에서 활용한 것이 바로 JSX.

  HTML에서 활용하는 문법과 유사하게 코드를 작성하여 요소를 생성할 수 있다.

  위의 경우와 아래의 경우는 같은코드

  ```react
  const title = React.createElement("h3", {onMouseEnter: () => console.log("I'm clicked!")}, "title");
  
  const Title = (
  	<h3 onMouseEnter={() => console.log("I'm clicked!")}>
      	title
      </h3>
  )
  ```

  바로 JSX를 사용할 경우 에러가 발생한다.

  ![image-20220612225146584](React.assets/image-20220612225146584.png)

  따라서, 아래의 코드를 위의 코드로 변환시켜야 함. 브라우저가 JSX를 이해할 수 있도록 뭔가를 설치해줘야만 한다. `Babel`

- `Babel` : 코드를 변환해주는 녀석

  JSX로 적은 코드를 브라우저가 이해할 수 있는 형태로 바꿔줌.(브라우저는 JSX를 모름)

  혼자 할 경우 babel standalone을 설치해주자.([BABEL링크](https://babeljs.io/docs/en/babel-standalone))

  ```react
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script type="text/babel">
  	...
  </script>
  ```

- 컴포넌트를 다른 컴포넌트안에 어떻게 넣는가.

  ```react
  function Title() {
      return (
      	<h3>...</h3>
      )
  }
  
  const Button = () => (
  	<button>...</button>
  )
  
  const Container = (
  	<div>
      	<Title />
          <Button />
      </div>
  )
  ```

- state

  vanilla.js의 경우 state가 변경되면 html이 재렌더링 되면서 UI가 업데이트 되는 반면에 React.js의 경우 새 컴포넌트를 생성하느 것이 아니라 이전에 렌더링된 html과 변경된 html을 **비교하여 변경된 부분만 다시 렌더링**을 해준다.

  ```react
  const root = document.getElementById("root");
  let counter = 0;
  function countUp() {
      counter = counter + 1;
      render();
  }
  function render() {
      ReactDOM.render(<App />, root)
  }
  const App = () => (
  	<h3>Total Clicks : 0</h3>
      <button onClick={countUp}>click me!</button>
  )
  render();
  ```

  react 어플 내에서 data를 저장하고, 자동으로 리렌더링을 일으킬 수 있는 방법.