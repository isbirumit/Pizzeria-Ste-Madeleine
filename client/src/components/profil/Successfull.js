import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const Successfull = () => {
    const location = useLocation();
    const state = location.state;
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
            <h3>Voici votre facture</h3>
            <p>Numero de facture : {state.form.userId}</p>
            <p>
                Merci encore {state.form.name} d'avoir commander chez nous :){" "}
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
export default Successfull;
