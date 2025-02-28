import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
    dsn: "https://f41384e26dd32bb880758de1fc48162b@o4508887414210560.ingest.de.sentry.io/4508897800486992",
    integrations: [nodeProfilingIntegration()],
    tracesSampleRate: 1.0
});

Sentry.profiler.startProfiler();

Sentry.startSpan(
    {
        name: "My First Transaction"
    },
    () => {}
);

Sentry.profiler.stopProfiler();

export default Sentry;
