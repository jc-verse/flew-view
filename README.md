# flew_view

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

[参考](https://www.jianshu.com/p/74c06e649e71)

```js
/*获取路由*/
export const getCurPage = () => {
  let pages = getCurrentPages();
  let curPage = pages[pages.length - 1];
  return curPage;
};

/*组件中*/
/*获取当前路由*/
let curPage = getCurPage();
//在微信小程序或是app中，通过curPage.options；如果是H5，则需要curPage.$route.query（H5中的curPage.options为undefined，所以刚好就不需要条件编译了）
let curParam = curPage.options || curPage.$route.query;
```
