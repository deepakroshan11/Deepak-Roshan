import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { DATA } from "@/data/resume";
import { Icons } from "@/components/icons";

// ============================================
// COMPONENTS
// ============================================

function CertificationCard(props: {
    name: string;
    issuer: string;
    year: string;
    url?: string;
}) {
    const { name, issuer, year, url } = props;

    const content = (
        <div className="flex items-start justify-between gap-4 rounded-lg border border-border bg-card p-4 hover:bg-accent/50 transition-colors">
            <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm leading-tight text-foreground">
                    {name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                    {issuer}
                </p>
            </div>
            <Badge variant="outline" className="shrink-0 ml-2">
                {year}
            </Badge>
        </div>
    );

    if (url) {
        return (
            <Link href={url} target="_blank" rel="noopener noreferrer">
                {content}
            </Link>
        );
    }

    return content;
}

// ============================================
// MAIN SECTION
// ============================================

export default function CertificationsSection() {
    const certifications = DATA.certifications;

    if (!certifications || certifications.length === 0) {
        return null;
    }

    return (
        <div className="w-full min-w-0 overflow-hidden">
            <div className="flex min-h-0 w-full flex-col gap-y-8">
                <div className="flex w-full flex-col gap-y-4 text-left">
                    <div className="flex w-full items-center">
                        <div className="h-px flex-1 bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
                        <div className="z-10 shrink-0 rounded-xl border bg-primary px-4 py-1">
                            <span className="text-sm font-medium text-background">
                                Certifications
                            </span>
                        </div>
                        <div className="h-px flex-1 bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
                    </div>

                    <div className="flex w-full flex-col gap-y-3">
                        <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                            Certifications & Credentials
                        </h2>
                        <p className="text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg md:leading-relaxed lg:text-base lg:leading-relaxed">
                            Professional certifications from leading organizations in cloud computing, AI/ML, and software development.
                        </p>
                    </div>
                </div>

                <div className="grid gap-3 w-full">
                    {certifications.map((cert, idx) => (
                        <CertificationCard
                            key={idx}
                            name={cert.name}
                            issuer={cert.issuer}
                            year={cert.year}
                            url={cert.url}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}