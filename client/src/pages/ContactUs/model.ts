import axios from 'axios';
import { API } from '../../constants';
import { Dispatch } from '../../store';
import { DefaultContactData } from '../../components/forms/ContactUsForm';

export interface ContactUsState {
  isFinish: boolean;
  error?: string;
  oldData: DefaultContactData;
}

export const contactUs = {
  state: {
    isFinish: false,
    error: undefined,
    oldData: {},
  } as ContactUsState,
  reducers: {
    setState: (state: ContactUsState, { isFinish, error, oldData }: ContactUsState) => ({
      ...state,
      isFinish,
      error,
      oldData,
    }),
    setIsSent: (state: ContactUsState, { isFinish }: Partial<ContactUsState>) => ({
      ...state,
      isFinish,
    }),
  },
  effects: (dispatch: Dispatch) => ({
    postFeedback: async (payload: DefaultContactData) => {
      dispatch.loader.showLoader();
      let error: string;

      await axios.post(API.feedback, payload)
        .catch((err: Error) => {
          error = 'Something went wrong';

          throw err;
          // на самом деле это просто реджектит промис, а не крашит приложение
        })
        .finally(() => {
          dispatch.contactUs.setState({
            isFinish: true,
            error,
            oldData: payload,
          });

          dispatch.loader.hideLoader();
        });
    },
  }),
};
