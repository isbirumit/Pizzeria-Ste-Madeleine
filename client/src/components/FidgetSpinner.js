import styled from "styled-components";
import { FallingLines } from "react-loader-spinner";
const FidgetSpinner = () => {
    return (
        <Div>
            <FallingLines
                color="#fa4f11"
                width="100"
                visible={true}
                ariaLabel="falling-lines-loading"
            />
        </Div>
    );
};

const Div = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40vh;
`;
export default FidgetSpinner;
