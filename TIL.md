- 노드 버전확인

  ```bash
  node -v
  // v14.16.1
  ```

- 리액트 프로젝트 생성

  `npx create-react-app 프로젝트명`

  ![image-20220616104653970](C:\Users\edgar\AppData\Roaming\Typora\typora-user-images\image-20220616104653970.png)

- 프로젝트 시작

  `cd 프로젝트명`

  `npm start`

- 기본 리액트 프로젝트 폴더 구조

  ![image-20220616105111962](C:\Users\edgar\AppData\Roaming\Typora\typora-user-images\image-20220616105111962.png)

- 폴더구조

  ```
  ├── src
  │   ├── assets // 이미지, 폰트 등 기타 정적파일
  │   ├── components // 화면 컴포넌트
  │   ├── modules // 커스텀 훅
  │   ├── pages // 컴포넌트로 구성 된 페이지(View)
  │   ├── styles // CSS
  │   └── utils // 게임 동작 혹은 반복되는 기능
  └── App.js
  
  ```

  



## 찾아볼 것

- node.js

  브라우저 내에 자바스크립트를 컴파일해서 실행할 수 있는 엔진이 필요하다. 이 엔진들 중에 구글 크롬 엔진인 V8엔진을 기반으로 동작하는 서버사이드 런타임. 브라우저 안에서만 돌아가던 자바스크립트가 서버사이드로 이동하게 된 것.

  서버에서 여러 가지 자바스크립트 모듈들을 받아오기 위한 저장소인 npm(node package manager)

  npm은 런타임 동안 노드 환경에서 쓰이는 다양한 패키지들을 관리한다.

- npm scripts

  nodejs의 모듈을 다운로드 받거나 재 다운로드 하거나, 모듈의 버전을 기록해야만 다른 개발자간의 협업도 가능할텐데, nodejs에서는 package.json이라는 버전 관리 파일 하나를 기준으로 관리한다.

  package.json의 역할은 버전 관리 말고도 특정 명령어를 매크로로서 간단하게 실행할 수 있게 해준다.

  모듈 파일들의 저장 공간은 `node_moudles`라는 폴더

- npm과 npx의 차이

  npm을 통해서 모듈을 설치할 때 `-g` 옵션을 주게 되면 매 프로젝트마다 모듈을 설치해 줄 필요가 없고 그저 내 컴퓨터 안에 글로벌한 공간에 모듈을 설치해 프로젝트마다 같은 모듈을 공유해서 사용할 수 있다. 즉, `-g`를 붙여주기만 하면 글로벌 모듈을 설치할 수 있다.

  ```bash
  npm install 모듈이름 -g
  ```

  그러나 이것은 좋은 방법이 아님.

  1. **모듈이 업데이트 되었는지 안되었는지 확인이 불가능.**

  2. **업데이트를 진행했을 때 변동사항이 생겨 다른 프로젝트에도 영향을 끼칠 수 있다.**

  3. create-react-app(cra) 같은 보일러플레이트에는 치명적이다.

     리액트 프로젝트 생성 도구인 create-react-app 같은 모듈의 경우, 변경사항이 꽤나 잦은 모듈이다. 그렇기 때문에 매 설치 전마다 npm으로 재 설치를 하지 않은 경우에는 이전 버전을 사용할 여지가 꽤 있다. 이런 프로젝트 생성 모듈은 매 업데이트마다 새로운 기능과 다양한 버그들이 고쳐진다. 그리고 이런 보일러플레이트 같은 경우, 항상 최신 버전을 유지해 주는 것이 좋은데, 매번 설치하는 것이 꽤나 귀찮은 일이다.

  따라서, 이에 대한 해결책이 바로 npx

  npm 5.2버전부터 npx가 기본 패키지로 제공되기 시작함. npx도 모듈의 일종. 모듈을 로컬에 저장하지 않고, 매번 **최신 버전의 파일만을 임시로 불러와 실행 시킨 후에, 다시 그 파일은 없어지는 방식**으로 모듈이 돌아가고 있다.

  이는 create-react-app같은 보일러 플레이트 모듈에 효과적. 매번 최신 버전만을 가져와서 설치해 주기 때문에 지금 어떤 버전을 사용하고 있는 지 신경쓸 필요가 없어진다.

- npm과 yarn의 차이

  npm과 yarn은 자바스크립트 패키지 매니저. 패키지란 npm에 업로드된 노드 모듈을 의미한다. 다양한 자바스크립트 프로그램이 패키지라는 이름으로 npm에 등록되어있고, 패키지가 다른 패키지를 사용할 경우 의존 관계를 가지기도 한다.

  yarn은 npm의 부족한 부분들을 개선하기 위해 Facebook에서 개발되었다.

  yarn은 npm의 어떤 것을 보완, 개선한걸까?

  1. 속도가 더 빠르다(performance)

     npm은 필수 단계를 순차적으로 수행하는 경향이 있어서 다음 패키지로 넘어가기 전에 각 패키지를 완전히 설치해야 한다고 한다. 하지만 yarn은 동시에 여러 패키지들을 설치할 수 있기 때문에 속도 면에서 크게 향상된다.(다만 npm 5.0이후와 비교해보면 이제 거의 차이가 없어졌다.)

  2. 보안성이 좋다(security)

     npm은 의존 관계를 가지는 다른 패키지들이 즉시 포함되도록 한다. 이런 부분이 편리하긴 한데 보안 문제에 있어 여러 취약점들을 불러올 수 있다. 반면에 yarn은 `yarn.lock`이나 `package.json` 파일에 있는 것들만 설치한다. 

  3. 패키지 잠금 파일

     npm은 `package-lock.json`, yarn은 `yarn.lock` 파일을 패키지 잠금 파일로 사용한다.

  4. 명령어

     npm은 `npm install <package>`, yarn은 `yarn add <package>` 명령어를 사용한다. 제거의 경우 npm은 `npm uninstall/rm <package>`, yarn은 `yarn remove <package>`

- React-Router

  `yarn add react-router-dom`

  yarn설치가 되지 않았다면 `npm install react-router-dom`

  1. **`<BrowserRouter>`**

     React-Router를 시작하는 코드. Router를 적용할 때 항상 최상단에 위치하는 태그. 주로 import시에 `BrowserRouter as Router`를 통해 Router로 가져오곤 한다.

  2. **`<Route>`**

     BrowserRouter 태그 안에서 활용되는 태그로써, 이 태그는 반드시 BrowserRouter 태그 안에서만 작동한다. 이 태그는 경로를 설정해주는 코드. 3가지 속성이 있다.

     - path : 주소를 의미. "/"라고 표기하면, React를 최초로 실행하였을 때 출력되는 페이지로 설정된다.
     - component : 설정한 path의 경로로 이동하였을 때, 실행되는 컴포넌트를 설정
     - exact : exact속성이 추가되면 설정한 경로와 '정확히 일치'해야 설정한 컴포넌트로 이동하게 된다.

  3. **`<Switch>`**

     Switch 태그는 모든 Router 요소들을 반복하면서, 현재 위치와 일치하는 첫 번째 요소만 렌더링 해주는 태그(경로가 적합한 처음 한 컴포넌트 찾아주는 태그)다. 경로가 동일한 컴포넌트들이 있거나, 매칭 되는 경로가 없을 때, 식별하는데 도움이 되는 태그다. 만약 매칭 되는 경로가 없다면 우리에게 익숙한 '404 Not Found' 오류 페이지가 나타나게 된다.

  - Switch의 네이밍이 Routes로 변경되었다.

    - exact 옵션 삭제

    - component 방식 변경(`component={Main}` 및 `render{() => <h1>hello</h1>} `삭제)
    - path를 기존의 `path="/Web/:id"` 에서 `path=":id"`로 상대경로로 지정
    - 이 외에도 `path="."`, `path=".."` 등으로 상대경로를 표현

  - v6방식

    - 복수의 라우팅을 막기위해서 사용되었던 exact는 더이상 사용하지 않고 여러 라우팅을 매칭하고 싶은 경우 URL 뒤에 `*`을 사용

      ```react
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/page1/*" element={<Page1 />} />
        </Routes>
      </BrowserRouter>
      ```

    - component대신 element로 바로 컴포넌트를 전달

  - 중첩 라우팅

    - Router.js에서 중첩 라우터를 사용하고, 중첩 라우터에서 Outlet 컴포넌트 사용

      ```react
      // Router.js
      <Routes>
      	<Route path="web/*" element={<Web />} >
              <Route path=":id" element={<WebPost />} />
          </Route>
      </Routes>
          
      // Web.js
      import { Link, Outlet } from "react-router-dom";
      const Web = () => {
          return (
          	<div>
                  <ul>
                  	<li>
                          <Link to="1">Post #1</Link>
                      </li>
                  </ul>
              	<Outlet />
              </div>
          )
      }
      ```

      `Router.js`에서 자식 태그로 중첩하는 라우터를 기재하고, `Web.js`에서 `Outlet` 라이브러리를 통해 가져온다.

    - 곧바로 사용

      ```react
      // Router.js
      <Route path="web/*" element={<Web />} />
      
      // Web.js
      const Web = () => {
          return (
          	<div>
                  <ul>
                  	<li>
                          <Link to="1">Post #1</Link>
                      </li>
                  </ul>
              	<Routes>
                  	<Route path=":id" element={<WebPost />} />
                  </Routes>
              </div>
          )
      }
      ```

  - props 사용

    - pathname 가져와 styled-components와 결합 - useLocation

      ```react
      import { Link, useLocation } from "react-router-dom"
      const Header = () => {
      	const { pathname } = useLocation();
          return (
          	<ul>
              	<li selected={pathname.startsWith("/web")}>
                  	<Link to="/web">go to web</Link>
                  </li>
              </ul>
          )
      }
      ```

    - `:id` path 이용하기 - useParams

      ```react
      import { useParams } from "react-router";
      
      const WebPost = () => {
          const {id} = useParams();
          return <div>#{id}번째 포스트</div>
      }
      
      export default WebPost;
      ```

  - useRoutes

    기존의 react-router-config가 useRoutes라는 Hook으로 변경 됨. 패키지를 추가로 설치해야했던 것과 달리 useRoutes라는 훅으로 routes를 구성할 수 있게 됨.

    > react-router-config의 기본사용
    >
    > routes라는 배열에 사용할 컴포넌트를 할당하여 사용.
    >
    > child의 child도 정의 가능. 자식 컴포넌트들을 더 렌더링해야하는 경우에 renderRoutes를 사용하는데 이 때 전달되는 파라미터는 3가지
    ```react
    // react-router-config
    // yarn add react-router-config로 설치 후에 사용
    import { renderRoutes } from "react-router-config";
    
    const routes = [
        {
            component: Root,
            routes: [
                {
                    path: "/",
                    exact: true,
                    component: Home
                },
                {
                    path: "/child/:id",
                    component: Child,
                    routes: [
                        {
                            path: "/child/:id/grand-child",
                            component: GrandChild
                        }
                    ]
                }
            ]
        }
    ];
    
    const Root = ({ route }) => (
    	<div>
            {/* 자식 라우트들이 렌더할 수 있도록  renderRoutes 실행 */}
        	{renderRoutes(route.routes)}
        </div>
    )
    
    const Child = ({ route }) => (
      <div>
        {/*  renderRoutes가 없으면 자식들은 렌더되지 않음  */}
        {renderRoutes(route.routes)}
      </div>
    );
    
    const GrandChild = ({ someProp }) => (
      <div>
        <div>{someProp}</div>
      </div>
    );
    
    ReactDOM.render(
      <BrowserRouter>
        {/* renderRoutes에 가장 처음 정의했던 routes 자체를 뿌려줌으로써 차례로 렌더링될 수 있도록 함 */}
        {renderRoutes(routes)}
      </BrowserRouter>,
      document.getElementById("root")
    );
    ```
    - useRoutes

    ```react
    function App() {
        let element = useRoutes([
            {path: "/", element: <Home />},
            {
                path: "invoices".
                element: <Invoices />,
                // 중첩 라우트의 경우도 Route에서와 같이 children이라는 property를 사용
                children: [
                	{ path: ":id", element: <Invoice /> },
            		{ path: "sent", element: <SentInvoices /> }
                ]
            },
            // NotFound 페이지는 다음과 같이 구현할 수 있음
            { path: "*", element: <NotFound /> }
        ]);
    	// element를 return함으로써 적절한 계층으로 구성된 element가 렌더링 될 수 있도록 함
    	return element;
    }
    ```

    공식문서에서는 `<Routes>`와 `useRoutes`모두를 권장하고, 둘 중 자신이 더 선호하는 것을 사용하면 된다.

  - useNavigate

    이전에 사용되던 useHistory는 useNavigate로 대체

    ```react
    import { useNavigate } from "react-router-dom";
    
    function App() {
        let navigate = useNavigate();
        function handleClick() {
            navigate("/home");
        }
        return (
        	<div>
            	<button onClick={handleClick}>home</button>
            </div>
        )
    }
    ```

  - v6 참고링크 : https://velog.io/@soryeongk/ReactRouterDomV6