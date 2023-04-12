import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import styled from "styled-components";

const Success = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    useEffect(() => {
        setCurrentUser({ ...currentUser, cart: [] });
    }, []);

    return (
        <Div>
            <h1>Merci d'avoir commander chez pizzeria ste madeleine!</h1>
            <h3>
                Merci beaucoup d'avoir commandé chez Pizzeria Sainte Madeleine!
                Nous espérons que vous apprécierez notre délicieuse pizza et nos
                autres spécialités. Nous prenons grand soin de préparer chaque
                commande avec des ingrédients frais et de qualité, et nous
                sommes ravis que vous ayez choisi de commander chez nous. Votre
                satisfaction est notre priorité absolue et nous espérons vous
                revoir bientôt!
            </h3>
            <p>
                Merci encore {currentUser.name} d'avoir commander chez nous :){" "}
            </p>
        </Div>
    );
};
const Div = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80vw;
    margin: auto;
`;

export default Success;
