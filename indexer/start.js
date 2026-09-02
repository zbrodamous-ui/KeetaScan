import { spawn } from "node:child_process";

const commands = [
    {
        name: "API",
        args: ["indexer/server.js"]
    },
    {
        name: "Indexer",
        args: [
            "indexer/indexer.js",
            "--watch"
        ]
    }
];

let shuttingDown = false;

const children =
    commands.map((command) => {
        console.log(
            `Starting KeetaView ${command.name}...`
        );

        return spawn(
            process.execPath,
            command.args,
            {
                stdio: "inherit"
            }
        );
    });

function shutdown(exitCode = 0) {
    if (shuttingDown) {
        return;
    }

    shuttingDown = true;

    console.log(
        "\nStopping KeetaView services..."
    );

    children.forEach((child) => {
        if (!child.killed) {
            child.kill();
        }
    });

    setTimeout(
        () => process.exit(exitCode),
        500
    ).unref();
}

children.forEach((child, index) => {
    child.on("error", (error) => {
        console.error(
            `${commands[index].name} failed to start:`,
            error
        );

        shutdown(1);
    });

    child.on("exit", (code) => {
        if (
            !shuttingDown &&
            code !== 0
        ) {
            console.error(
                `${commands[index].name} stopped unexpectedly with code ${code}.`
            );

            shutdown(code || 1);
        }
    });
});

process.on(
    "SIGINT",
    () => shutdown(0)
);

process.on(
    "SIGTERM",
    () => shutdown(0)
);
