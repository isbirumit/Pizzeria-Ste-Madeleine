import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { UserContext } from "./context/UserContext";
import HomePageSwiperSlider from "./swiper-slider/HomePageSwiperSlider";
import BG from "../public/bg.jpg";
import orderNowGif from "../public/homepage/orderNow.mp4";
import Logogif from "../public/homepage/Pizzeria.mp4";
import { Link, useNavigate } from "react-router-dom";
import Weather from "./weather/Weather";
import { FallingLines } from "react-loader-spinner";

const HomePage = () => {
    const { currentUser } = useContext(UserContext);
    const videoRef = useRef(null);
    const videoRefLogo = useRef(null);
    const navigate = useNavigate();
    const [pageLoaded, setPageLoaded] = useState(true);

    useEffect(() => {
        const option = {
            root: null,
            rootMarging: "0px",
            threshold: 0.5,
        };

        const callBack = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.play();
                } else {
                    entry.target.pause();
                }
            });
        };
        const observer = new IntersectionObserver(callBack, option);
        observer.observe(videoRef.current);
        return () => {
            observer.disconnect();
        };
    }, []);
    useEffect(() => {
        const option = {
            root: null,
            rootMarging: "0px",
            threshold: 0.5,
        };

        const callBack = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.play();
                } else {
                    entry.target.pause();
                }
            });
        };
        const observer = new IntersectionObserver(callBack, option);
        observer.observe(videoRefLogo.current);
        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <>
            {!pageLoaded ? null : (
                <HomePageWrapper>
                    <Weather />
                    <TopPageBox>
                        <HomePageSwiperSlider />
                    </TopPageBox>
                    <OrderLogo ref={videoRefLogo} src={Logogif} />
                    <HomePageTitle>Pizzeria Ste-Madeleine</HomePageTitle>
                    <ParagTitle>450-795-0101</ParagTitle>
                    <LinkAddress to={`https://goo.gl/maps/xzkYGqrxpBTy7HX68`}>
                        700 Bd Laurier, Sainte-Madeleine, QC J0H 1S0
                    </LinkAddress>

                    <SpanLine />

                    <RestaurantInformationBox>
                        <Img src={BG} />
                        <Parag>
                            Depuis notre ouverture en 2016, nous sommes fiers de
                            servir la meilleure pizza en ville. Situé au cœur de
                            Ste Madeleine, notre restaurant familial est un
                            endroit chaleureux et convivial où vous pourrez
                            savourer de délicieuses pizzas, des pâtes, des
                            salades et bien plus encore.
                        </Parag>
                    </RestaurantInformationBox>

                    <SpanLine />

                    <OrderNowBox>
                        <OrderPoster ref={videoRef} src={orderNowGif} />
                        <OrderBox>
                            <Parag>
                                Chez Pizzeria Ste Madeleine, nous aimons
                                récompenser nos clients fidèles. C'est pourquoi
                                nous offrons des points de récompense sur chaque
                                commande en ligne que vous passez avec nous.
                                Chaque fois que vous commandez en ligne, vous
                                accumulez des points. C'est notre façon de vous
                                remercier pour votre soutien continu et de
                                rendre votre expérience de commande en ligne
                                encore plus gratifiante. Commandez en ligne dès
                                maintenant pour commencer à accumuler des points
                                de récompense et profitez de remises exclusives
                                sur vos pizzas et plats préférés chez Pizzeria
                                Ste Madeleine.
                            </Parag>
                            <OrderBtn onClick={() => navigate("/menu")}>
                                Commandez Maintenant!
                            </OrderBtn>
                        </OrderBox>
                    </OrderNowBox>

                    <SpanLine />
                </HomePageWrapper>
            )}
        </>
    );
};

const HomePageWrapper = styled.div`
    width: 95%;
    position: relative;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    margin: auto;
    -webkit-box-shadow: 0px 23px 30px -32px rgba(191, 0, 0, 1);
    -moz-box-shadow: 0px 23px 30px -32px rgba(191, 0, 0, 1);
    box-shadow: 0px 23px 30px -32px rgba(191, 0, 0, 1);
    background-color: hsl(0, 0%, 93%);
    max-width: 1200px;
`;
const OrderLogo = styled.video`
    display: flex;
    justify-content: center;
    position: relative;
    width: auto;
    max-width: 800px;
    border-radius: 5px;
    align-items: center;
`;
const TopPageBox = styled.div`
    margin: 10px 0;
`;
const SpanLine = styled.span`
    width: 80%;
    border: 1px solid hsl(28, 58%, 30%);
    margin: auto;
    margin-top: 25px;
    margin-bottom: 25px;
`;
const HomePageTitle = styled.h1`
    text-align: center;
    color: hsl(28, 58%, 30%);
`;
const RestaurantInformationBox = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
`;
const ParagTitle = styled.p`
    font-size: 2.2rem;
    text-align: center;
    color: hsl(28, 58%, 30%);
    bottom: 50px;
`;
const LinkAddress = styled(Link)`
    font-size: 2.2rem;
    text-align: center;
    color: hsl(28, 58%, 30%);

    text-decoration: none;
    &:hover {
        color: hsl(28, 53%, 55%);
    }
`;
const Parag = styled.p`
    font-size: 2.2rem;
    text-align: center;
    margin: 30px 0;
`;
const Img = styled.img`
    object-fit: cover;
    max-height: 300px;
    border-radius: 5px;
`;
const OrderNowBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;
const OrderPoster = styled.video`
    width: 100%;
    max-width: fit-content;
    max-height: 800px;
    border-radius: 5px;
`;
const OrderBox = styled.div`
    width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const OrderBtn = styled.button`
    margin: auto;
    margin-top: 30px;
    font-family: Georgia, "Times New Roman", Times, serif;
    height: 50px;
    font-weight: bold;
    color: #ffffff !important;
    font-size: 14px;
    text-shadow: 1px 1px 0px #3b2410;
    box-shadow: 1px 1px 1px #fa4f11;
    padding: 10px 25px;
    border-radius: 23px;
    border: 1px solid #3b2410;
    background: #fa4f11;
    background: linear-gradient(to top, #fa4f11, #794a20);
    transition: all 250ms ease-in-out;
    width: 50vw;
    max-width: 400px;
    align-items: center;
    cursor: pointer;
    &:hover {
        color: #000000 !important;
        background: #794a20;
        background: linear-gradient(to top, #794a20, #fa4f11);
    }
`;
const MenuBox = styled.div`
    background-color: green;
    text-align: center;
`;

export default HomePage;
