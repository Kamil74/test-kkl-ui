import { loaderStore } from './loaderStore';

describe('loaderStore', () => {
    it('should update isOpen state correctly when show() is called', () => {
        loaderStore.getState().show();
        expect(loaderStore.getState().isOpen).toEqual(true);
    });

    it('should update isOpen state correctly when hide() is called', () => {
        loaderStore.getState().hide();
        expect(loaderStore.getState().isOpen).toEqual(false);
    });
});
