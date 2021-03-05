import styled from 'styled-components';

export const Form = styled.form`
  input {
    margin-bottom: 10px;
  }

  .file-container {
    display: flex;
    align-items: center;
    margin-top: 10px;

    button {
      margin-right: 20px;
    }
  }

  input.input-button-file {
    display: none;
  }
`;
