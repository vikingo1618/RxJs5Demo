module.exports = {
    entry: "./main",
    //All output goes to this address
    output: { filename: "app.js" },
    module: {
        loaders: [
            {
                test: /.ts$/,
                loader: "ts-loader"
            }
        ]
    },
    resolve: {
        //All ts are converted to js
        extensions: [".ts", ".js"]
    }
}