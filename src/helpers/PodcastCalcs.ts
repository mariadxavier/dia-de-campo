import { PodcastEpisodeItem } from "../types";

class PodcastCalcs {
    private calcAverageTime = (episodes: PodcastEpisodeItem[]) => {
        const value = episodes.reduce((sum, episode) => {
            return sum + parseInt(episode.duration.replace(/min/g, ""));
        }, 0) / episodes.length;
        return `${value.toFixed(1)}`;
    }

    getPodcastAverageDuration = (episodes: PodcastEpisodeItem[]) => {
        return this.calcAverageTime(episodes);
    }
}

export default new PodcastCalcs();
