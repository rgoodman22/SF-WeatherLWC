public class wJSON2Apex {
    
    public Double lat;
    public Double lon;
    public String timezone;
    public Integer timezone_offset;
    public Current current;
    public List<Minutely> minutely;
    public List<Hourly> hourly;
    public List<Daily> daily;

	public class Weather {
		public Integer id;
		public String main;
		public String description;
		public String icon;
	}

	public class Hourly {
		public Integer dt;
		public Double temp;
		public Double feels_like;
		public Integer pressure;
		public Integer humidity;
		public Double dew_point;
		public Integer clouds;
		public Integer visibility;
		public Double wind_speed;
		public Integer wind_deg;
		public List<Weather> weather;
		public Double pop;
		public Rain rain;
	}

	public class Rain {
		public Double h;
	}

	public class Daily {
		public Integer dt;
		public Integer sunrise;
		public Integer sunset;
		public Temp temp;
		public Feels_like feels_like;
		public Integer pressure;
		public Integer humidity;
		public Double dew_point;
		public Double wind_speed;
		public Integer wind_deg;
		public List<Weather> weather;
		public Integer clouds;
		public Double pop;
		public Double rain;
		public Double uvi;
	}

	public class Temp {
		public Double day;
		public Double min;
		public Double max;
		public Double night;
		public Double eve;
		public Double morn;
	}

	public class Minutely {
		public Integer dt;
		public Integer precipitation;
	}

	public class Current {
		public Integer dt;
		public Integer sunrise;
		public Integer sunset;
		public Double temp;
		public Double feels_like;
		public Integer pressure;
		public Integer humidity;
		public Double dew_point;
		public Double uvi;
		public Integer clouds;
		public Integer visibility;
		public Double wind_speed;
		public Integer wind_deg;
		public List<Weather> weather;
	}

	public class Feels_like {
		public Double day;
		public Double night;
		public Double eve;
		public Double morn;
	}

	
	public static WJSON2Apex parse(String json) {
		return (WJSON2Apex) System.JSON.deserialize(json, WJSON2Apex.class);
	}
}