import styled from "styled-components"
import HomePageSwiperSlider from "./swiper-slider/HomePageSwiperSlider"


const HomePage = () => {

    return (
        <>
            <HomePageWrapper>
                <HomePageSwiperSlider />
                <RestaurantInformationBox>
                    RESTAURANT INFORMATION
                </RestaurantInformationBox>
                <SpanLine />
                <OrderNowBox>
                    ORDER NOW BOX
                </OrderNowBox>
                <SpanLine />
                <MenuBox>
                    MENU BOX
                </MenuBox>

            </HomePageWrapper>
        </>
    )
}

const HomePageWrapper = styled.div`
    display:flex;
    flex-direction: column;
    width: 90%;
    margin: auto;
    -webkit-box-shadow: 0px 23px 30px -32px rgba(191,0,0,1);
-moz-box-shadow: 0px 23px 30px -32px rgba(191,0,0,1);
box-shadow: 0px 23px 30px -32px rgba(191,0,0,1);
`
const SpanLine = styled.span`
    width: 80%;
    border:1px solid black;
    margin:auto;
    margin-top: 25px;
    margin-bottom:25px;
`
const RestaurantInformationBox = styled.div`
    height: 350px;
    background-color: blue;
    text-align:center;
`
const OrderNowBox = styled.div`
    height: 250px;
    background-color: red;
    text-align:center;
`
const MenuBox = styled.div`
    height: 250px;
    background-color: green;
    text-align:center;
`

export default HomePage