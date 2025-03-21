
const F1_DATA = {
    GrandsPrix: [
      {
        name: "Australian Grand Prix",
        events: [
          { type: "Free Practice 1", date: "14 Mar", time: "02:30" },
          { type: "Free Practice 2", date: "14 Mar", time: "06:00" },
          { type: "Free Practice 3", date: "15 Mar", time: "02:30" },
          { type: "Qualifying", date: "15 Mar", time: "06:00" },
          { type: "Grand Prix", date: "16 Mar", time: "05:00" },
        ],
      },
      {
        name: "Chinese Grand Prix",
        events: [
          { type: "Free Practice 1", date: "21 Mar", time: "04:30" },
          { type: "Sprint Qualifying", date: "21 Mar", time: "08:30" },
          { type: "Sprint", date: "22 Mar", time: "04:00" },
          { type: "Qualifying", date: "22 Mar", time: "08:00" },
          { type: "Grand Prix", date: "23 Mar", time: "08:00" },
        ],
      },
      {
        name: "Japanese Grand Prix",
        events: [
          { type: "Free Practice 1", date: "4 Apr", time: "04:30" },
          { type: "Free Practice 2", date: "4 Apr", time: "08:00" },
          { type: "Free Practice 3", date: "5 Apr", time: "04:30" },
          { type: "Qualifying", date: "5 Apr", time: "08:00" },
          { type: "Grand Prix", date: "6 Apr", time: "07:00" },
        ],
      },
      {
        name: "Bahrain Grand Prix",
        events: [
          { type: "Free Practice 1", date: "11 Apr", time: "13:30" },
          { type: "Free Practice 2", date: "11 Apr", time: "17:00" },
          { type: "Free Practice 3", date: "12 Apr", time: "14:30" },
          { type: "Qualifying", date: "12 Apr", time: "18:00" },
          { type: "Grand Prix", date: "13 Apr", time: "17:00" },
        ],
      },
      {
        name: "Saudi Arabian Grand Prix",
        events: [
          { type: "Free Practice 1", date: "18 Apr", time: "15:30" },
          { type: "Free Practice 2", date: "18 Apr", time: "19:00" },
          { type: "Free Practice 3", date: "19 Apr", time: "15:30" },
          { type: "Qualifying", date: "19 Apr", time: "19:00" },
          { type: "Grand Prix", date: "20 Apr", time: "19:00" },
        ],
      },
      {
        name: "Miami Grand Prix",
        events: [
          { type: "Free Practice 1", date: "2 May", time: "18:30" },
          { type: "Sprint Qualifying", date: "2 May", time: "22:30" },
          { type: "Sprint", date: "3 May", time: "18:00" },
          { type: "Qualifying", date: "3 May", time: "22:00" },
          { type: "Grand Prix", date: "4 May", time: "22:00" },
        ],
      },
      {
        name: "Emilia Romagna Grand Prix",
        events: [
          { type: "Free Practice 1", date: "16 May", time: "13:30" },
          { type: "Free Practice 2", date: "16 May", time: "17:00" },
          { type: "Free Practice 3", date: "17 May", time: "12:30" },
          { type: "Qualifying", date: "17 May", time: "16:00" },
          { type: "Grand Prix", date: "18 May", time: "15:00" },
        ],
      },
      {
        name: "Monaco Grand Prix",
        events: [
          { type: "Free Practice 1", date: "23 May", time: "13:30" },
          { type: "Free Practice 2", date: "23 May", time: "17:00" },
          { type: "Free Practice 3", date: "24 May", time: "12:30" },
          { type: "Qualifying", date: "24 May", time: "16:00" },
          { type: "Grand Prix", date: "25 May", time: "15:00" },
        ],
      },
      {
        name: "Spanish Grand Prix",
        events: [
          { type: "Free Practice 1", date: "30 May", time: "13:30" },
          { type: "Free Practice 2", date: "30 May", time: "17:00" },
          { type: "Free Practice 3", date: "31 May", time: "12:30" },
          { type: "Qualifying", date: "31 May", time: "16:00" },
          { type: "Grand Prix", date: "1 Jun", time: "15:00" },
        ],
      },
      {
        name: "Canadian Grand Prix",
        events: [
          { type: "Free Practice 1", date: "13 Jun", time: "19:30" },
          { type: "Free Practice 2", date: "13 Jun", time: "23:00" },
          { type: "Free Practice 3", date: "14 Jun", time: "18:30" },
          { type: "Qualifying", date: "14 Jun", time: "22:00" },
          { type: "Grand Prix", date: "15 Jun", time: "20:00" },
        ],
      },
      {
        name: "Austrian Grand Prix",
        events: [
          { type: "Free Practice 1", date: "27 Jun", time: "13:30" },
          { type: "Free Practice 2", date: "27 Jun", time: "17:00" },
          { type: "Free Practice 3", date: "28 Jun", time: "12:30" },
          { type: "Qualifying", date: "28 Jun", time: "16:00" },
          { type: "Grand Prix", date: "29 Jun", time: "15:00" },
        ],
      },
      {
        name: "British Grand Prix",
        events: [
          { type: "Free Practice 1", date: "4 Jul", time: "13:30" },
          { type: "Free Practice 2", date: "4 Jul", time: "17:00" },
          { type: "Free Practice 3", date: "5 Jul", time: "12:30" },
          { type: "Qualifying", date: "5 Jul", time: "16:00" },
          { type: "Grand Prix", date: "6 Jul", time: "16:00" },
        ],
      },
      {
        name: "Belgian Grand Prix",
        events: [
          { type: "Free Practice 1", date: "25 Jul", time: "12:30" },
          { type: "Sprint Qualifying", date: "25 Jul", time: "16:30" },
          { type: "Sprint", date: "26 Jul", time: "12:00" },
          { type: "Qualifying", date: "26 Jul", time: "16:00" },
          { type: "Grand Prix", date: "27 Jul", time: "15:00" },
        ],
      },
      {
        name: "Hungarian Grand Prix",
        events: [
          { type: "Free Practice 1", date: "1 Aug", time: "13:30" },
          { type: "Free Practice 2", date: "1 Aug", time: "17:00" },
          { type: "Free Practice 3", date: "2 Aug", time: "12:30" },
          { type: "Qualifying", date: "2 Aug", time: "16:00" },
          { type: "Grand Prix", date: "3 Aug", time: "15:00" },
        ],
      },
      {
        name: "Dutch Grand Prix",
        events: [
          { type: "Free Practice 1", date: "29 Aug", time: "12:30" },
          { type: "Free Practice 2", date: "29 Aug", time: "16:00" },
          { type: "Free Practice 3", date: "30 Aug", time: "11:30" },
          { type: "Qualifying", date: "30 Aug", time: "15:00" },
          { type: "Grand Prix", date: "31 Aug", time: "15:00" },
        ],
      },
      {
        name: "Italian Grand Prix",
        events: [
          { type: "Free Practice 1", date: "5 Sep", time: "13:30" },
          { type: "Free Practice 2", date: "5 Sep", time: "17:00" },
          { type: "Free Practice 3", date: "6 Sep", time: "12:30" },
          { type: "Qualifying", date: "6 Sep", time: "16:00" },
          { type: "Grand Prix", date: "7 Sep", time: "15:00" },
        ],
      },
      {
        name: "Azerbaijan Grand Prix",
        events: [
          { type: "Free Practice 1", date: "19 Sep", time: "10:30" },
          { type: "Free Practice 2", date: "19 Sep", time: "14:00" },
          { type: "Free Practice 3", date: "20 Sep", time: "10:30" },
          { type: "Qualifying", date: "20 Sep", time: "14:00" },
          { type: "Grand Prix", date: "21 Sep", time: "13:00" },
        ],
      },
      {
        name: "Singapore Grand Prix",
        events: [
          { type: "Free Practice 1", date: "3 Oct", time: "11:30" },
          { type: "Free Practice 2", date: "3 Oct", time: "15:00" },
          { type: "Free Practice 3", date: "4 Oct", time: "11:30" },
          { type: "Qualifying", date: "4 Oct", time: "15:00" },
          { type: "Grand Prix", date: "5 Oct", time: "14:00" },
        ],
      },
      {
        name: "United States Grand Prix",
        events: [
          { type: "Free Practice 1", date: "17 Oct", time: "19:30" },
          { type: "Sprint Qualifying", date: "17 Oct", time: "23:30" },
          { type: "Sprint", date: "18 Oct", time: "19:00" },
          { type: "Qualifying", date: "18 Oct", time: "23:00" },
          { type: "Grand Prix", date: "19 Oct", time: "21:00" },
        ],
      },
      {
        name: "Mexico City Grand Prix",
        events: [
          { type: "Free Practice 1", date: "24 Oct", time: "20:30" },
          { type: "Free Practice 2", date: "25 Oct", time: "00:00" },
          { type: "Free Practice 3", date: "25 Oct", time: "19:30" },
          { type: "Qualifying", date: "25 Oct", time: "23:00" },
          { type: "Grand Prix", date: "26 Oct", time: "21:00" },
        ],
      },
      {
        name: "Brazilian Grand Prix",
        events: [
          { type: "Free Practice 1", date: "7 Nov", time: "15:30" },
          { type: "Sprint Qualifying", date: "7 Nov", time: "19:30" },
          { type: "Sprint", date: "8 Nov", time: "15:00" },
          { type: "Qualifying", date: "8 Nov", time: "19:00" },
          { type: "Grand Prix", date: "9 Nov", time: "18:00" },
        ],
      },
      {
        name: "Las Vegas Grand Prix",
        events: [
          { type: "Free Practice 1", date: "21 Nov", time: "01:30" },
          { type: "Free Practice 2", date: "21 Nov", time: "05:00" },
          { type: "Free Practice 3", date: "22 Nov", time: "01:30" },
          { type: "Qualifying", date: "22 Nov", time: "05:00" },
          { type: "Grand Prix", date: "23 Nov", time: "05:00" },
        ],
      },
      {
        name: "Qatar Grand Prix",
        events: [
          { type: "Free Practice 1", date: "28 Nov", time: "14:30" },
          { type: "Sprint Qualifying", date: "28 Nov", time: "18:30" },
          { type: "Sprint", date: "29 Nov", time: "15:00" },
          { type: "Qualifying", date: "29 Nov", time: "19:00" },
          { type: "Grand Prix", date: "30 Nov", time: "17:00" },
        ],
      },
      {
        name: "Abu Dhabi Grand Prix",
        events: [
          { type: "Free Practice 1", date: "5 Dec", time: "10:30" },
          { type: "Free Practice 2", date: "5 Dec", time: "14:00" },
          { type: "Free Practice 3", date: "6 Dec", time: "11:30" },
          { type: "Qualifying", date: "6 Dec", time: "15:00" },
          { type: "Grand Prix", date: "7 Dec", time: "14:00" },
        ],
      },
    ],
  };

  export default F1_DATA;