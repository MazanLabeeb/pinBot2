npm install node-fetch@2;
fetch("https://www.nmc.org.uk/registration/search-the-register/", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "sec-ch-ua": "\"Chromium\";v=\"104\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"104\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-requested-with": "XMLHttpRequest",
    "cookie": "ASP.NET_SessionId=wb52nstendqvezxpjbisppjz; __RequestVerificationToken=FjaHEaXznqG_J9I8bVk4V5Suz6cl4ZZDSal8F2shsNAPXiOeeD0nS5aut0LoufGxbuHG9I0PiyYZu-L71T-5P3iJOIqpIMXWihYm5zAe1901; cookiesEnabled=cookiesEnabled; CookieConsent={stamp:%27UOL3x8+w198XPAkQ7RvjKq/fq23Pp361G80OYlT+8yZ+lhB39/uKLw==%27%2Cnecessary:true%2Cpreferences:true%2Cstatistics:true%2Cmarketing:true%2Cver:1%2Cutc:1659727951386%2Cregion:%27pk%27}; _ga=GA1.3.324403978.1659727950; _gid=GA1.3.801267326.1659727950; _gat_UA-2590479-1=1",
    "Referer": "https://www.nmc.org.uk/registration/search-the-register/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": "__RequestVerificationToken=9vsPBKtUXPFD7ImPzkG_Oo64BsrsjAYli9lrj7IXceXc2M8Xv3OlQrNTAoNsb2mJ_PjDUBfS3Tccy3APtAPSnyQpZ0eJJ1hmxGMh_QBIb3Y1&PinNumber=10B1361E&FirstName=&LastName=&hiddenRecaptcha=03ANYolquyGgqORCEfD0vJQGLPNx31n9iifQw0MmM66lszTLU3NIqnfYBQw7uScydEutJGlOtyXgJQ3wEjIO5oyPQV5TCOOaDWsg1yAs_CZroH_5lC8__yFcvGlcP6Pn-A_hcdYug_z3dL_cyWuHnoaD4RRGRU-DbV5hKTy5bs-uKZuggyP4ZG7UhBsdLkVTkNxD5q5exJzxRHDqO2Ot2vWv044Gx1E68aIuTmhoZFmmsq5M7RmJGmokXYdtcyo0ciH6GvC97ESwTis2Fs0dGIFI-eMxkCsiYKKvJXj9kmD3vS44qAqOWN4WFw3SB73s-bFI6j__20P8i1_o8JdvHnHe0aUgkBLmCmLCCiaBh-jz35u9BCrJGgJpHgA74lTnKgTzQqNi43epD-SvFA3IWwpbuDLZ1egcvHpQehMSJDlaACGJc-laTZqLEOZZ-rqwI9-e33jL_UeHEDO8jBERxwSqcpDWGb3Gc7JRSn_4oofgLfZNTUFb7fuVyFMALu2D2cjyT4mPZQUjRM&g-recaptcha-response=03ANYolquyGgqORCEfD0vJQGLPNx31n9iifQw0MmM66lszTLU3NIqnfYBQw7uScydEutJGlOtyXgJQ3wEjIO5oyPQV5TCOOaDWsg1yAs_CZroH_5lC8__yFcvGlcP6Pn-A_hcdYug_z3dL_cyWuHnoaD4RRGRU-DbV5hKTy5bs-uKZuggyP4ZG7UhBsdLkVTkNxD5q5exJzxRHDqO2Ot2vWv044Gx1E68aIuTmhoZFmmsq5M7RmJGmokXYdtcyo0ciH6GvC97ESwTis2Fs0dGIFI-eMxkCsiYKKvJXj9kmD3vS44qAqOWN4WFw3SB73s-bFI6j__20P8i1_o8JdvHnHe0aUgkBLmCmLCCiaBh-jz35u9BCrJGgJpHgA74lTnKgTzQqNi43epD-SvFA3IWwpbuDLZ1egcvHpQehMSJDlaACGJc-laTZqLEOZZ-rqwI9-e33jL_UeHEDO8jBERxwSqcpDWGb3Gc7JRSn_4oofgLfZNTUFb7fuVyFMALu2D2cjyT4mPZQUjRM&X-Requested-With=XMLHttpRequest",
  "method": "POST"
}).then((response)=>console.log(response));