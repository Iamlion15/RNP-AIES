import Document, { Html, Head, Main, NextScript } from 'next/document'


class MyDocument extends Document {
    render() {
        return (
            <Html lang='en'>
                <Head>
                    <meta charSet='UTF-8' />
                    {/* <meta
						name='viewport'
						content='width=device-width, initial-scale=1.0'
					/> */}
                    <link
                        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
                        rel="stylesheet"
                    />
                    {/* <script
                        type="module"
                        src="../public/fonts/js/Copperplate_Gothic_Bold_Regular-normal.js"
                    ></script>
                    <script
                        type="module"
                        src="../public/fonts/js/Nunito_Bold-normal"
                    ></script>
                    <script
                        type="module"
                        src="../public/fonts/js/Nunito_Regular-normal"
                    ></script>
                    <script
                        type="module"
                        src="../public/fonts/js/Nunito_Light-normal"
                    ></script> */}
                </Head>
                <title>RNP-AIES - Rwanda National Police Accident Investigation System</title>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
