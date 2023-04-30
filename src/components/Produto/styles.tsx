import styled from 'styled-components';
import Card from '@material-ui/core/Card';

export const Container = styled(Card)`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  width: 100%;
  div {
    align-items: center;
    display: flex;
    gap: 20px;
    p {
      font-size: 22px;
      font-weight: bold;
      padding: 5px 0 0 5px;
      @media(max-width: 1024px) {
        font-size: 14px;
      }
      @media(max-width: 400px) {
        width: 80px;
      }
    }
    span {
      font-size: 16px;
      @media(max-width: 1024px) {
        font-size: 10px;
      }
    }
    @media(max-width: 1024px) {
      gap: 0px;
    }
  }
`;