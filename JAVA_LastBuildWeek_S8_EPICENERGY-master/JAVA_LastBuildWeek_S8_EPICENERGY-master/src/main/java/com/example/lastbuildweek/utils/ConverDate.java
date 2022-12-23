package com.example.lastbuildweek.utils;

import java.time.LocalDate;

public class ConverDate {

    public static LocalDate convertDate(String date) {
        return LocalDate.parse(date);
    }
}
