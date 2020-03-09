import styled from 'styled-components';
import { ButtonToolbar } from 'rsuite';

const StickyToolbar = styled(ButtonToolbar)`
  display: flex;
  position: sticky;
  bottom: 0;
  left: 0;
  padding: 15px;
  background: #fff;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.06), 0 4px 4px rgba(0, 0, 0, 0.12);
  margin-top: 100px;
`;

export default StickyToolbar;
