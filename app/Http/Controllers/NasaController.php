<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Carbon\Carbon;

class NasaController extends Controller
{
    public function getGuzzleRequest($startDate, $endDate)
    {

        $from = Carbon::createFromDate(2015, 12, 5);

        $to = Carbon::createFromDate(2015, 12, 2);

        $dates = $this->generateDateRange($to, $from);

        $response = array();;
        foreach ($dates as $date) {
            $response1 = $this->getRequestData($date);
            array_push($response, $response1);
        }
        
        return response()->json([
            $response
        ]);
    }

    private function generateDateRange(Carbon $start_date, Carbon $end_date)
    {

        $dates = [];

        for ($date = $start_date; $date->lte($end_date); $date->addDay()) {

            $dates[] = $date->format('Y-n-j');
        }

        return $dates;
    }

    private function getRequestData(String $date)
    {
        $client = new Client();
        $request = $client->get('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=' . $date . '&api_key=PzQlQJ5SlsoJkrqiGgiML2IByhlluiC21yGNozgT');
        $response = json_decode($request->getBody());

        return $response;
    }
}
