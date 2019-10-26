import { createTest, destroyVM } from '../util';
    import Page from 'component/page';
    
    describe('Page', () => {
      let vm;
      afterEach(() => {
        destroyVM(vm);
      });
    
      it('create', () => {
        vm = createTest(Page, true);
        expect(vm.$el).to.exist;
      });
    });
    
