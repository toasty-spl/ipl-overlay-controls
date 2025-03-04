import { existsSync, readdirSync, readFileSync } from 'fs';
import * as nodecgContext from './nodecg';
import { NodecgBundle } from '../../types/nodecgBundle';
import { GameVersion } from '../../types/enums/gameVersion';

const nodecg = nodecgContext.get();
const bundlesDir = `${process.env.NODECG_ROOT}/bundles`;
const allGameVersions = Object.keys(GameVersion);

export const dependentBundles: Array<NodecgBundle> = readdirSync(bundlesDir, { withFileTypes: true })
    .filter(dir => dir.isDirectory() && dir.name !== nodecg.bundleName)
    .map(bundle => {
        const bundlePackagePath = `${bundlesDir}/${bundle.name}/package.json`;
        if (existsSync(bundlePackagePath)) {
            const parsedPackage = JSON.parse(readFileSync(bundlePackagePath, 'utf-8'));
            const gameVersions = normalizeGameVersions(parsedPackage.compatibleGameVersions);
            if (gameVersions.length <= 0) {
                nodecg.log.warn(`Could not parse compatible game versions for bundle '${bundle.name}'.`);
            }

            if ('compatibleDashboardVersion' in parsedPackage) {
                return ({
                    name: bundle.name,
                    compatibleDashboardVersion: parsedPackage.compatibleDashboardVersion,
                    compatibleGameVersions: gameVersions ?? []
                });
            }
        }

        return null;
    })
    .filter(Boolean);

function normalizeGameVersions(versions?: Array<string> | null): Array<string> {
    if (!Array.isArray(versions) || versions.length <= 0) {
        return [ GameVersion.SPLATOON_2 ];
    }

    return versions.filter(version => allGameVersions.includes(version));
}
