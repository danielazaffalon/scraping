import { Crawler } from "./scraping.js";
import { LogEntry } from "./log.js";
import { StorageService } from "./storageService.js";

/** Execute Function */
async function execute(){

    const logEntry = new LogEntry();//"requestedFilter" from terminal
    const storageService = new StorageService();
    const crawler = new Crawler('https://news.ycombinator.com/');
    
    const rawData = await crawler.getRawData();
    const entries = crawler.dataScraping(rawData);
    logEntry.fillAttribute(entries.length,"totalCrawledEntries");
    const filteredEntries = crawler.filterEntries(entries, 'title', 5, true, "comments", true);
    logEntry.fillAttribute(filteredEntries.length,"totalFilteredEntries");
    logEntry.endLog();

    await storageService.insertLogEntry(logEntry.exportLog());
    // console.log(filteredEntries);
    console.log(logEntry.exportLog());
}
execute();