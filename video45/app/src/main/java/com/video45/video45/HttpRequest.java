package com.video45.video45;

import android.os.AsyncTask;

import java.net.HttpURLConnection;

/**
 * Created by nicholas on 23/10/15.
 */
public class HttpRequest extends AsyncTask<String , Void, String> {

    String GETURL = "http://video45.cloudapp.net";

    @Override
    protected String doInBackground(String... str) {
        GETURL += str[0].replace(" ", "%20");

//        try {
//            HttpURLConnection
//        }
        return "";
    }
}
