import { ElectionDetail, ElectionSummary } from "@/src/ballot/types/election.type";

class BallotService {
  private get baseUrl() {
    return process.env.API_URL!;
  }

  async listBallots(): Promise<ElectionSummary[]> {
    const res = await fetch(`${this.baseUrl}/ballots`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) return [];
    return res.json();
  }

  async getBallot(electionId: string): Promise<ElectionDetail | null> {
    const res = await fetch(`${this.baseUrl}/ballots/${electionId}`, {
      next: { revalidate: 30 },
    });
    if (res.status === 404) return null;
    if (!res.ok) return null;
    return res.json();
  }
}

export const ballotService = new BallotService();
