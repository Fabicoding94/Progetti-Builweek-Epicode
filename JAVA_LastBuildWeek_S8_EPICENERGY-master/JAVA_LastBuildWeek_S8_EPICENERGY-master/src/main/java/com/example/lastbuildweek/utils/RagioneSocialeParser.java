package com.example.lastbuildweek.utils;

import com.example.lastbuildweek.entities.RagioneSociale;

public class RagioneSocialeParser {
    public static RagioneSociale parse(String stringa) {
        switch (stringa) {
            case "PA" -> {
                return RagioneSociale.PA;
            }
            case "SAS" -> {
                return RagioneSociale.SAS;
            }
            case "SPA" -> {
                return RagioneSociale.SPA;
            }
            case "SRL" -> {
                return RagioneSociale.SRL;
            }

        }
        return RagioneSociale.PA;
    }
}
