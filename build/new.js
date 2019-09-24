'use strict';
process.on('exit', () => {
  console.log();
});

if (!process.argv[2]) {
  console.error('[组件名]必填');
  process.exit(1);
}

const path = require('path');
const fileSave = require('file-save');
const uppercamelcase = require('uppercamelcase');
const componentname = process.argv[2];
const ComponentName = uppercamelcase(componentname);
const component = path.resolve(__dirname, '../src/component', componentname);
const Files = [
  {
    filename: 'index.js',
    content: `import ${ComponentName} from './${componentname}.vue';

export default ${ComponentName};
`
  },
  {
    filename: `${componentname}.vue`,
    content: `<template>
    <div class="${ComponentName}"></div>
</template>
    
<script>
export default {
  name: '${ComponentName}'
};
</script>
<style lang='scss' scoped>
@import './index.scss';
</style>
`
  },
  {
    filename: path.join('../../test/unit/specs', `${componentname}.spec.js`),
    content: `import { createTest, destroyVM } from '../util';
    import ${ComponentName} from 'component/${componentname}';
    
    describe('${ComponentName}', () => {
      let vm;
      afterEach(() => {
        destroyVM(vm);
      });
    
      it('create', () => {
        vm = createTest(${ComponentName}, true);
        expect(vm.$el).to.exist;
      });
    });
    `
  },
  {
    filename: path.join('./', `index.scss`),
    content: ``
  }
];
// 创建组件
Files.forEach(file => {
  fileSave(path.join(component, file.filename))
    .write(file.content, 'utf8')
    .end('\n');
});

console.log('创建完成');
