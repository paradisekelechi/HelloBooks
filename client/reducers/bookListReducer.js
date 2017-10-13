import * as actionConstants from '../utils/actionConstants';

const initialState = {
    borrowed: {
        isLoading: true,
        error: '',
        count: 0,
        list: {}
    },
    unreturned: {
        isLoading: true,
        error: '',
        count: 0,
        list: {}
    },
    total: {
        isLoading: true,
        error: '',
        count: 0,
        list: {}
    },
}

    export default (state = initialState, action) => {
        switch (action.type) {
            case actionConstants.GET_BOOKS_BORROWED:
                return Object.assign(
                    {},
                    state,
                    {
                        borrowed: {
                            isLoading: false,
                            error: '',
                            count: action.payload.book.count,
                            list: action.payload.book.rows
                        }
                    }
                ); 
            case actionConstants.GET_BOOKS_UNRETURNED:
                return Object.assign(
                    {},
                    state,
                    {
                        unreturned: {
                            isLoading: false,
                            error: '',
                            count: action.payload.book.count,
                            list: action.payload.book.rows
                        }
                    }
                );
            case actionConstants.GET_BOOKS:
                return Object.assign(
                    {},
                    state,
                    {
                        total: {
                            isLoading: false,
                            error: '',
                            count: action.payload.book.count,
                            list: action.payload.book.rows
                        }
                    }
                ); 
            
          default:
            return state;
        }
    }