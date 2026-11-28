import assert from 'node:assert/strict';
import {extractMarkdownUrls} from '../../tools/validate-knowledge.mjs';

const rin='https://kb.ddex.net/implementing-each-standard/recording-information-notification-(rin)/rin-explained/structure-of-rin/';
const ern='https://kb.ddex.net/implementing-each-standard/electronic-release-notification-message-suite-(ern)/ern-4-explained/ern-4-structure/';
const encoded='https://kb.ddex.net/implementing-each-standard/electronic-release-notification-message-suite-%28ern%29/ern-4-explained/ern-4-structure/';
const checks=[];
const t=(name,fn)=>{fn();checks.push(name)};

t('S564 RIN balanced parentheses are preserved',()=>{
 assert.deepEqual(extractMarkdownUrls('[RIN](https://kb.ddex.net/implementing-each-standard/recording-information-notification-(rin)/rin-explained/structure-of-rin/)'),[rin]);
});
t('S565 ERN balanced parentheses are preserved',()=>{
 assert.deepEqual(extractMarkdownUrls('[ERN](https://kb.ddex.net/implementing-each-standard/electronic-release-notification-message-suite-(ern)/ern-4-explained/ern-4-structure/)'),[ern]);
});
t('percent-encoded parentheses remain exact',()=>{
 assert.deepEqual(extractMarkdownUrls('[ERN](https://kb.ddex.net/implementing-each-standard/electronic-release-notification-message-suite-%28ern%29/ern-4-explained/ern-4-structure/)'),[encoded]);
});
t('multiple links in one frozen row are extracted in order',()=>{
 assert.deepEqual(extractMarkdownUrls('| [RIN]('+rin+') | [ERN]('+ern+') |'),[rin,ern]);
});
t('escaped parentheses are unescaped as Markdown requires',()=>{
 assert.deepEqual(extractMarkdownUrls('[escaped](https://example.test/a\\(b\\)/c)'),['https://example.test/a(b)/c']);
});
t('angle-bracket destinations with title are preserved',()=>{
 assert.deepEqual(extractMarkdownUrls('[angle](<https://example.test/a(b)/c> "title")'),['https://example.test/a(b)/c']);
});
t('nested balanced parentheses are preserved',()=>{
 assert.deepEqual(extractMarkdownUrls('[nested](https://example.test/a(b(c)d)/e)'),['https://example.test/a(b(c)d)/e']);
});
t('ordinary parenthetical prose is not treated as a URL',()=>{
 assert.deepEqual(extractMarkdownUrls('S565 (ERN 4) is distinct from [docs](https://example.test/ern).'),['https://example.test/ern']);
});
t('unclosed link is ignored rather than emitting a truncated URL',()=>{
 assert.deepEqual(extractMarkdownUrls('[bad](https://example.test/a(b)'),[]);
});

console.log(JSON.stringify({suite:'F00_MARKDOWN_LINKS',checks:checks.length,passed:checks.length,results:checks.map(x=>[x,true])},null,2));
