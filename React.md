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

