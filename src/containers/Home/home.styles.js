import styled from 'styled-components';
import { Row } from 'react-bootstrap';

export const Header = styled.header`
    height: 70vh;
`

export const RandomRecipeContent = styled(Row)`
    @media (min-width: 768px) {
        margin-top: 3em;
    }
`;

