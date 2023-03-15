import { format } from 'date-fns';

export function formatContent(content: any, emojis: any) {
  for (var idx in emojis) {
    content = content.replace(
      `:${emojis[idx].shortcode}:`,
      `<img src='${emojis[idx].url}' alt='emoji' class='ap-display-name-emoji'/>`
    );
  }
  return content;
}

export function formatName(
  structuredText: string,
  alternativeName: string,
  account: any
) {
  if (structuredText == null || structuredText == '') {
    return alternativeName;
  }
  for (var idx in account.emojis) {
    structuredText = structuredText.replace(
      `:${account.emojis[idx].shortcode}:`,
      `<img src='${account.emojis[idx].url}' alt='emoji' class='ap-display-name-emoji'/>`
    );
  }
  return structuredText;
}

export function formatDate(strDate: string) {
  return format(new Date(strDate), 'MMM do, yyyy');
}
